import { Game } from "phaser";
import { BootScene } from "./Vistas/Scenes/BootScene";
import { MapScene } from "./Vistas/Scenes/MapScene";
import Alpine from "alpinejs";

Alpine.start();

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: (2 * window.innerHeight) / 3
  },
  dom: {
    createContainer: true
  },
  scene: [
    BootScene,
    //Preloader,
    //MainMenu,
    MapScene
  ]
};

const game = new Game(config);
