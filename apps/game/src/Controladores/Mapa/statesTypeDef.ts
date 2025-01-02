import type { ActionFunction, NonReducibleUnknown, EventObject } from "xstate";
import World from "src/mecs";
import { MapScene } from "src/Vistas/Scenes/MapScene";
import { Tilemaps } from "phaser";

export type TEvents = {
  type: string;
  [key: string]: any;
};

export type TContext = {
  unit?: number;
  target?: Tilemaps.Tile | number;
  world: World;
  scene: MapScene;
};

export type MAction = ActionFunction<
  TContext,
  TEvents,
  TEvents,
  NonReducibleUnknown,
  never,
  never,
  never,
  never,
  EventObject
>;