import type { World } from "@mabo/mecs";
import type { Input, Tilemaps } from "phaser";
import type MapSceneController from "../Controller";

export interface StateContext {
  action?: string;
  activeUnit?: string;
  controller: MapSceneController;
  target?: Tilemaps.Tile;
  world: World;
}

export interface Event {
  pointer: Input.Pointer;
  target?: Tilemaps.Tile;
  unit?: string;
}