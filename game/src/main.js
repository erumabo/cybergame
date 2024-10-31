import { Game } from "phaser";
import { MapScene } from "./views/Scenes/MapScene.js";

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
  scene: [
    //Boot,
    //Preloader,
    //MainMenu,
    MapScene
  ]
};

const game = new Game(config);