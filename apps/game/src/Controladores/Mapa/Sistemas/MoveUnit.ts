import * as Phaser from "phaser";

export default function MoveAction({ world }: any) {
  //world.actor.send("gotoUnidadSeleccionada")
  const tile = world.target as Phaser.Tilemaps.Tile;
  world.scene.gridEngine.moveTo("" + world.activeUnit, tile, {
    algorithm: "A_STAR",
    considerCosts: true
  });
}
