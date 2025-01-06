import * as Phaser from "phaser";
import type { TContext } from "../statesTypeDef";

export default function moveAction({ context }: { context: TContext }) {
  const tile = context.target as Phaser.Tilemaps.Tile;
  context.scene.gridEngine.moveTo("" + context.unit, tile, {
    algorithm: "A_STAR",
    considerCosts: true
  });
}
