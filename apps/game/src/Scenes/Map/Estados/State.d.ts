import type { World } from "@mabo/mecs";
import type { Input, Tilemaps } from "phaser";
import type { MapScene } from "../Scene";
import type MapSceneController from "../Controller";

export interface StateContext {
  action?: string;
  activeUnit?: string;
  target?: Tilemaps.Tile;
  world: World;
}

export interface UIEvent {
  pointer: Input.Pointer;
  target?: Tilemaps.Tile;
  unit?: string;
}

export interface EventPayload {
  event: UIEvent;
  context: StateContext;
  scene: MapScene;
  controller: MapSceneController;
}
