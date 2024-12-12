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

  interaccionObjeto(point: Phaser.Input.Pointer, entity: number) {
    if (this.context.world.entityHasComponent(entity, "UnitSprite")) {
      // Unidad
      this.context.unidadActiva = entity;
      this.context.setState(UnidadActiva);
      return;
    }
  }

  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    //noop
  }

  enter() {}
  update(dt: number) {}
  exit() {}
}
