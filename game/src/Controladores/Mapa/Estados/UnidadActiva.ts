import * as Phaser from "phaser";
import IMapSceneControllerState from "./IMapSceneControllerState";
import MapSceneController from "../MapController";
import TargetTileSelected from "./TargetTileSelected";

export default class UnidadActiva {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  //#region UI Events
  interaccionObjeto(point: Phaser.Input.Pointer, target: number) {
    this.context.objetivo = target;
  }

  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    this.context.objetivo = target;
    this.context.setState(TargetTileSelected);
  }
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
