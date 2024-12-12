import IMapSceneControllerState from "./IMapSceneControllerState";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import * as Phaser from "phaser";
import MapSceneController from "../MapController";
import anime from "animejs/lib/anime.es.js";

export default class ObjetivoSeleccionado {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  interaccionObjeto(point: Phaser.Input.Pointer, target: number) {
    this.context.objetivo = target;
  }

  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    // noop
  }
  enter() {}
  update(dt: number) {}
  exit() {}

  //#region Systems
  //#endregion
}
