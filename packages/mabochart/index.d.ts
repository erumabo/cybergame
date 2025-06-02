type Action = (...data: any[]) => void;
type Transition =
  | string
  | {
      action?: Action;
      target: string;
    }
  | {
      action: Action;
    };

interface BaseState {
  entry?: Action;
  update?: Action;
  on: {
    [event: string]: Transition;
  };
  exit?: Action;
}

type States = {
  [state: string]: State;
};

interface ParentState {
  states: { [state: string]: State };
  initial: string;
}

export type State = BaseState | (BaseState & ParentState);

export class StateMachine {
  constructor(baseState: ParentState);
  currentState: string;
  start(...data: any[]): StateMachine;
  error(): StateMachine;
  send(event: string, ...data: any[]): Promise<StateMachine>;
}
