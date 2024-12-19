import IMapSceneControllerState from "./IMapSceneControllerState";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import * as Phaser from "phaser";
import MapSceneController from "../MapController";
import UnidadActiva from "./UnidadActiva";

export default class IDLE {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  //#region UI Events
  interaccionObjeto(point: Phaser.Input.Pointer, entity: number) {
    if (this.context.world.entityHasComponent(entity, "UnitSprite")) {
      // Unidad
      this.context.unidadActiva = entity;
      this.context.setState(UnidadActiva);
      return;
    }
  }

  interaccionMapa = (_: Phaser.Input.Pointer, __: Phaser.Tilemaps.Tile) => _;
  actionMenuClick = (_: string) => _;
  //#endregion

  //#region Livecycle
  enter() {
  }
  update(dt: number) {}
  exit() {}
  //#endregion
  
}
