export class StateMachine {
  #baseState;
  #stateStack;

  constructor(baseState) {
    this.#baseState = baseState;
    this.#baseState.on = {
      "*": this.error
    };
    this.currentState = null;
    this.#stateStack = [];
  }

  start(data) {
    this.#transition(this.#baseState.initial, data);
    return this;
  }

  error(event, state) {
    throw new Error(`Transition not implemented: ${event} at ${state}`);
    return this;
  }

  send(event, data) {
    let state;
    for (let i = this.#stateStack.length - 1; i >= 0; i--) {
      state = this.#stateStack[i];
      for (const transition in state.on) {
        if (transition == event) {
          const handler = state.on[transition];
          if (typeof handler === "string")
            return this.#transition(handler, data);
          if (handler.action) handler.action(data);
          return this.#transition(handler.target, data);
        }
      }
    }
    return this.error(event, this.currentState);
  }

  #transition(nextState, data) {
    const statepath = nextState.split(".");
    const newStack = [];

    let state = this.#baseState;
    for (let stateName of statepath) {
      if (state.states[stateName])
        newStack.push((state = state.states[stateName]));
      else throw new Error(`Invalid state ${stateName} at ${nextState}`);
    }

    this.currentState = nextState;

    while (Object.hasOwn(state, "initial")) {
      if (Object.hasOwn(state.states, state.initial)) {
        this.currentState = this.currentState + "." + state.initial;
        newStack.push((state = state.states[state.initial]));
      } else {
        throw new Error(
          `Invalid state ${state.initial} at ${this.currentState}.${state.initial}`
        );
      }
    }

    if (Object.hasOwn(state, "states")) {
      throw new Error(
        `Composite state ${this.currentState} has no initial state defined`
      );
    }

    this.#morphStack(newStack, data);

    return this;
  }

  #morphStack(newStack, data) {
    let i = 0,
      j = this.#stateStack.length - 1,
      m = Math.min(newStack.length, this.#stateStack.length);
    for (; i < m && newStack[i] == this.#stateStack[i]; ++i)
      Object.hasOwn(newStack[i], "update") && newStack[i].update(data);
    for (; j >= i; j--)
      Object.hasOwn(this.#stateStack[j], "exit") &&
        this.#stateStack[j].exit(data);
    for (; i < newStack.length; i++)
      Object.hasOwn(newStack[i], "entry") && newStack[i].entry(data);

    this.#stateStack = [...newStack];
  }
}
