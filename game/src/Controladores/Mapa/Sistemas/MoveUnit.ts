import * as Phaser from "phaser";
import anime from "animejs/lib/anime.es.js";
import MapSceneController from "../MapController";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";

export default function move(context: MapSceneController) {
  const unit = context.world.getEntityComponent(
    context.unidadActiva!,
    "UnitSprite"
  ) as UnitSprite;
  const tile = context.objetivo as Phaser.Tilemaps.Tile;
  let { pixelX: x, pixelY: y, width, height } = tile;
  x = x + width / 2;
  y = y + height / 2;

  let { x: ox, y: oy } = unit;

  // Compute Path
  
  let distance = 100 * Math.floor((Math.abs(x - ox) + Math.abs(y - oy))/32);

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
