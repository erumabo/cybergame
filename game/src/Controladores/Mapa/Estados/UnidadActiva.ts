import IMapSceneControllerState from "./IMapSceneControllerState";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import * as Phaser from "phaser";
import MapSceneController from "../MapController";
import anime from "animejs/lib/anime.es.js";

export default class UnidadActiva {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  onUnitSelected(point: Phaser.Input.Pointer, target: UnitSprite) {}

  onTileSelected(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    this.move(this.context.unidadActiva!, target);
  }

  enter() {}
  update(dt: number) {}
  exit() {}

  //#region
  move(unit: UnitSprite, tileTarget: Phaser.Tilemaps.Tile) {
    let { pixelX: x, pixelY: y, width, height } = tileTarget;
    x = x + width / 2;
    y = y + height / 2;

    let { x: ox, y: oy } = unit;
    let distance = Math.abs(x - ox) + Math.abs(y - oy);

    const tl = anime.timeline({
      easing: "linear",
      duration: distance
    });

    tl.add({
      targets: unit,
      x,
      y
    });
  }
  //#endregion
}
