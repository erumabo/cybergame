import type { EventPayload } from "../Estados/State";
import type MapSceneController from "../Controller";

export interface System {
  name: string;
  displayName: string;
  icon?: string;
  register: (controller: MapSceneController) => void;
  test: (context: EventPayload) => boolean;
  execute: (context: EventPayload) => void;
}
