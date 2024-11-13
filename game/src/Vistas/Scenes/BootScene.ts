import * as Phaser from "phaser";
import { gameConfig } from "../../levelConfig.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  init() {}
  preload() {
    // this goes in main preload
    // there => preload tilesets, and other general stuff
    // here => load this.mapa ("Bosque")
    this.load.pack("juego", gameConfig.pack);
  }
  create() {
    this.scene.start("MapScene", { mapa: "Bosque" });
  }
  update(dt: number) {}
}
