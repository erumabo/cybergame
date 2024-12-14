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

  //#region UI Events
  interaccionObjeto(point: Phaser.Input.Pointer, target: number) {
    this.context.objetivo = target;
  }

  interaccionMapa = (_: Phaser.Input.Pointer, __: Phaser.Tilemaps.Tile) => _;
  actionMenuClick = (_: string) => _;
  //#endregion
  
  //#region Livecycle
  enter() {}
  update(dt: number) {}
  exit() {}
  //#endregion

  //#region Systems
  //#endregion
}
