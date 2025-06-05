import type { StateContext } from "../Estados/State";

export interface System {
  name: string;
  displayName: string;
  icon?: string;
  register: (context: StateContext) => void;
  test: (context: StateContext) => boolean;
  execute: (context: StateContext) => void;
}
