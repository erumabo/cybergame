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

interface ParentState {
  states: { [state: string]: State };
  initial: string;
}

export type State = BaseState | (BaseState & ParentState);

export class Actor {
  public stack: State[];
  public state: string;
  constructor(stateMachine: StateMachine);
  public send(event: string, ...data: any[]): Promise<StateMachine>;
}

export class StateMachine {
  constructor(baseState: ParentState);
  public start(...data: any[]): Actor;
  public _send(actor: Actor, event: string, ...data: any[]): Promise<Actor>;
}
