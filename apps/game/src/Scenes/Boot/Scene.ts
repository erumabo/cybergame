import { Scene } from "phaser";
import { gameConfig } from "../../levelConfig.js";

export class BootScene extends Scene {
  constructor() {
    super("Boot");
  }
  init() {
    this.cache.addCustom("ink");
  }
  preload() {
    // if this takes too much time, it should go in preload scene
    // & here we only load the loading screen
    console.time("Boot preload time");
    this.load.pack("juego", gameConfig.pack);
    console.timeEnd("Boot preload time");
  }
  create() {
    this.scene.start("MapScene", { mapa: "Bosque" });
  }
  override update(_: number) {}
}
