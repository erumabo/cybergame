import { Scene } from "phaser";
import type { GameObjects } from "phaser";
import type { Story } from "inkjs";
import { marked } from "marked";
import mustache from "mustache";
import VNDisplay from "../GameObjects/VNDisplay";
import StoryManager from "../../Plugins/StoryManager";

export class VNScene extends Scene {
  knot?: string;
  background?: GameObjects.Rectangle;
  story?: Story;
  vnDisplay?: VNDisplay;
  storyManager!: StoryManager;

  constructor() {
    super("VN");
  }

  init() {}

  preload() {}

  create() {
    const { width, height: cheight } = this.sys.game.canvas;
    const height = cheight / 3;
    if (!this.background) {
      this.background = this.add
        .rectangle(0, 0, width, cheight, 0x000000, 0.25)
        .setOrigin(0, 0);
      //this.background.setVisible(false);
    }

    if (!this.vnDisplay) {
      this.vnDisplay = new VNDisplay(this, width, height);
      this.add.existing(this.vnDisplay);
      this.vnDisplay.setInteractive().on("pointerdown", () => this.stepStory());
    }

    this.events.on("wake", () => {
      this.playStory();
    });

    this.playStory();
  }

  override update(_: number) {}

  playStory() {
    this.vnDisplay!.show();
    this.stepStory();
  }

  stepStory() {
    let story = this.storyManager.story;
    if (!story) {
      throw new Error("Story fragment not set");
    }

    if (story.canContinue) {
      const text = story.Continue();
      if (!text) {
        throw new Error("Story didnt return next line");
      }

      const formatted = marked.parse(
        mustache.render(text, { player: "Aqua" }, {}, ["<%", "%>"])
      ) as string;
      this.vnDisplay!.setHTML(formatted);
    } else {
      this.vnDisplay!.hide();
      this.scene.sleep();
      setTimeout(() => this.scene.resume("MapScene"), 100);
    }
  }
}
