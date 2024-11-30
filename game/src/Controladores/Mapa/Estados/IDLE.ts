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

  onUnitSelected(point: Phaser.Input.Pointer, target: UnitSprite) {
    this.context.unidadActiva = target;
    let nextState: IMapSceneControllerState =
      this.context.states.get("UnidadActiva") ?? new UnidadActiva(this.context);
    this.context.states.set("UnidadActiva", nextState);
    this.context.setState(nextState);
  }

  onTileSelected(point: Phaser.Input.Pointer, unit: Phaser.Tilemaps.Tile) {}

  enter() {}
  update(dt: number) {}
  exit() {}
}
