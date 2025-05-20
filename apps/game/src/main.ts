import { COLORS } from "./globals";

import { Game } from "phaser";

// Scenes
import { BootScene } from "./Vistas/Scenes/BootScene";
import { MapScene } from "./Vistas/Scenes/MapScene";
import { VNScene } from "./Vistas/Scenes/VNScene";

// Plugins
import StoryManager from "./Plugins/StoryManager";
import DatGui from "./Plugins/DatGui";
import { GridEngine } from "grid-engine";

import Alpine from "alpinejs";
Alpine.start();

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: COLORS["--brown-60"],
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
      },
      {
        key: "datGui",
        plugin: DatGui,
        start: false,
        mapping: "datGui"
      }
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

(() => {
  new Game(config);
})();
