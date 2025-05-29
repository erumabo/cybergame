import type { Tilemaps } from "phaser";

export default function MoveAction({ world }: any) {
  const tile = world.target as Tilemaps.Tile;
  world.scene.gridEngine.moveTo(world.activeUnit, tile, {
    algorithm: "A_STAR",
    considerCosts: true,
    noPathFoundStrategy: "STOP",
    pathBlockedStrategy: "WAIT",
    pathBlockedWaitTimeoutMs: 2000
  });
}
