import { Scene } from "phaser";
import type { GameObjects } from "phaser";
import VNDisplay from "./GameObjects/VNDisplay";
import type StoryManager from "src/Plugins/StoryManager";

export class VNScene extends Scene {
  declare storyManager: StoryManager;

  #background?: GameObjects.Rectangle;
  #vnDisplay?: VNDisplay;

  //#region Lifecycle
  constructor() {
    super("VN");
  }

  init() {}

  preload() {}

  create() {
    const { width, height: canvas_height } = this.sys.game.canvas;
    const height = canvas_height / 3;
    if (!this.#background) {
      this.#background = this.add
        .rectangle(0, 0, width, canvas_height, 0x000000, 0.25)
        .setOrigin(0, 0);
    }

    if (!this.#vnDisplay) {
      this.#vnDisplay = new VNDisplay(this, width, height);
      this.add.existing(this.#vnDisplay);
      this.#vnDisplay
        .setInteractive()
        .on("pointerdown", () => this.#stepStory());
    }

    this.events.on("wake", () => this.#playStory());
    this.#playStory();
  }

  override update(_: number) {}
  //#endregion Lifecycle

  //#region Private
  #playStory() {
    this.#vnDisplay!.show();
    this.#stepStory();
  }

  #stepStory() {
    const text = this.storyManager.Continue();
    if (text) {
      this.#vnDisplay!.setHTML(text);
      return;
    }

    this.#vnDisplay!.hide();
    this.scene.sleep();
    setTimeout(() => this.scene.resume("MapScene"), 100);
  }
  //#region Private
}
