import type { Tilemaps } from "phaser";

export default function MoveAction({ world }: any) {
  //world.actor.send("gotoUnidadSeleccionada")
  const tile = world.target as Tilemaps.Tile;
  world.scene.gridEngine.moveTo("" + world.activeUnit, tile, {
    algorithm: "A_STAR",
    considerCosts: true
  });
}
