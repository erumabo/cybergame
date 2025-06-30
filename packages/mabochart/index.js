/**
 * A simple implementation of statecharts
 * @module @mabo/chart
 */

/**
 * Actor that responds to events based on a state machine model
 * Allows reusing the same machine def with multiple actors/entities
 */
export class Actor {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
    this.stack = [];
    this.state = "";
  }

  /**
   * Send an event to be processed by the machine
   * @param {string} event - The event
   * @param {*} data - Arbitrary data to be provided to event handlers
   */
  send(ev, ...data) {
    this.stateMachine._send(this, ev, ...data);
  }
}

/**
 * Class that represents a state chart machine
 */
export class StateMachine {
  #baseState;

  /**
   * @param {Object} baseState - The base state object, must define initial stata and other sub states
   * @param {string} baseState.initial - The intial state of the machine
   * @param {Object} baseState.states - The configuration of all child states, can be recursive
   */
  constructor(baseState) {
    this.#baseState = baseState;
    this.#baseState.on = {
      "*": this.error
    };
  }

  /**
   * Starts a new actor for this machine in the initial state
   */
  start(...data) {
    const actor = new Actor(this);
    this.#transition(actor, this.#baseState.initial, ...data);
    return actor;
  }

  _send(actor, event, ...data) {
    return new Promise((resolve) => {
      let handler = this.#getStateHandler(actor, event);
      if (!handler) return resolve(actor);

      let target = handler;
      if (typeof handler != "string") {
        if (handler.action) handler.action(...data);
        target = handler.target;
      }

      if (!target) resolve(actor);
      else resolve(this.#transition(actor, target, ...data));
    });
  }

  #getStateHandler(actor, event) {
    let i = actor.stack.length - 1,
      state = actor.stack[i];
    for (; i >= 0; state = actor.stack[--i])
      for (const transition in state.on)
        if (this.#glob(transition, event)) return state.on[transition];
  }

  #transition(actor, nextState, ...data) {
    const statepath = nextState?.split(".") ?? [];
    const newStack = [];

    let state = this.#baseState;
    for (let stateName of statepath) {
      if (state.states[stateName])
        newStack.push((state = state.states[stateName]));
      else throw new Error(`Invalid state ${stateName} at ${nextState}`);
    }

    actor.state = nextState;

    while (Object.hasOwn(state, "initial")) {
      if (Object.hasOwn(state.states, state.initial)) {
        actor.state = actor.state + "." + state.initial;
        newStack.push((state = state.states[state.initial]));
      } else {
        throw new Error(
          `Invalid state ${state.initial} at ${actor.state}.${state.initial}`
        );
      }
    }

    if (Object.hasOwn(state, "states")) {
      throw new Error(
        `Composite state ${actor.state} has no initial state defined`
      );
    }

    this.#morphStack(actor, newStack, ...data);

    return actor;
  }

  #morphStack(actor, newStack, ...data) {
    let i = 0,
      j = actor.stack.length - 1,
      m = Math.min(newStack.length, actor.stack.length);
    for (; i < m && newStack[i] == actor.stack[i]; ++i)
      Object.hasOwn(newStack[i], "update") && newStack[i].update(...data);
    for (; j >= i; j--)
      Object.hasOwn(actor.stack[j], "exit") && actor.stack[j].exit(...data);
    for (; i < newStack.length; i++)
      Object.hasOwn(newStack[i], "entry") && newStack[i].entry(...data);

    actor.stack = [...newStack];
  }

  #glob(transition, event) {
    return new RegExp(
      "^" + transition.replaceAll(".", "\\.").replaceAll("*", "[^\\.]*") + "$"
    ).test(event);
  }
}
