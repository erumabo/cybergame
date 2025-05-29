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
    this.load.pack("juego", gameConfig.pack);
  }
  create() {
    this.scene.start("MapScene", { mapa: "Bosque" });
  }
  override update(_: number) {}
}
