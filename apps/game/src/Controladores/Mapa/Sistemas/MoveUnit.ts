import * as Phaser from "phaser";
import anime from "animejs/lib/anime.es.js";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import { TContext } from "../statesTypeDef";

export default function moveAction({ context }: { context: TContext }) {
  const unit = context.world.getEntityComponent(
    context.unit!,
    "UnitSprite"
  ) as UnitSprite;
  const tile = context.target as Phaser.Tilemaps.Tile;
  let { pixelX: x, pixelY: y, width, height } = tile;
  x = x + width / 2;
  y = y + height / 2;

  // Compute Path
  let { x: ox, y: oy } = unit;
  let distance = 100 * Math.floor((Math.abs(x - ox) + Math.abs(y - oy)) / 32);

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