import * as Phaser from "phaser";

import IMapSceneControllerState from "./IMapSceneControllerState";
import MapSceneController from "../MapController";
import UnidadActiva from "./UnidadActiva";

import move from "../Sistemas/MoveUnit";

export default class TargetTileSelected {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  interaccionObjeto(point: Phaser.Input.Pointer, target: number) {
    //this.context.objetivo = target;
  }

  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    // noop
  }
  
  enter() {
    move(this.context);

    this.context.objetivo = undefined;
    this.context.setState(UnidadActiva);
  }
  update(dt: number) {}
  exit() {}

  //#region Systems
  
  //#endregion
}
