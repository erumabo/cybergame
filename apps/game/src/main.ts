import { COLORS } from "./globals";

import { Game } from "phaser";

// Scenes
import { BootScene } from "./Scenes/Boot/Scene";
import { MapScene } from "./Scenes/Map/Scene";
import { VNScene } from "./Scenes/VN/Scene";

// Plugins
import StoryManager from "./Plugins/StoryManager";
import { GridEngine } from "grid-engine";
//import DatGui from "./Plugins/DatGui";

import Alpine from "alpinejs";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  backgroundColor: COLORS["--white"],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    autoRound: true
  },
  dom: {
    createContainer: true
  },
  scene: [
    BootScene,
    //Preloader,
    //MainMenu,
    MapScene,
    VNScene
  ],
  plugins: {
    global: [
      {
        key: "storyManager",
        plugin: StoryManager,
        start: false,
        mapping: "storyManager"
      }
      /*{
        key: "datGui",
        plugin: DatGui,
        start: false,
        mapping: "datGui"
      }*/
    ],
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine"
      }
    ]
  }
};

let game: Game;
window.onload = () => {
  Alpine.start();
  game = new Game(config);
};

function onChangeScreen() {
  if (game) game.scale.resize(window.innerWidth, window.innerHeight);
}

// Very important orientation changes, otherwise the game size grows unbound
const _orientation =
  screen.orientation ||
  (screen as any).mozOrientation ||
  (screen as any).msOrientation;
_orientation.addEventListener("change", () => onChangeScreen());
window.addEventListener("resize", () => onChangeScreen());
