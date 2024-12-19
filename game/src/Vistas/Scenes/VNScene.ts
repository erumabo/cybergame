import * as Phaser from "phaser";
import ink from "inkjs";
import { marked } from "marked";
import mustache from "mustache";
import VNDisplay from "../GameObjects/VNDisplay";

export class VNScene extends Phaser.Scene {
  knot?: string;
  background?: Phaser.GameObjects.Rectangle;
  story?: ink.Story;
  vnDisplay?: VNDisplay;

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
        .rectangle(0, 0, width, cheight, 0x000000, 0.5)
        .setOrigin(0, 0);
      this.background.setVisible(false);
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

  update(dt: number) {}

  playStory(knot) {
    this.vnDisplay.show();
    this.stepStory();
  }

  stepStory() {
    let story: ink.Story = this.storyManager.story;
    if (story.canContinue) {
      const text = marked.parse(
        mustache.render(story.Continue(), { player: "Aqua" }, {}, ["<%", "%>"])
      );
      this.vnDisplay.setHTML(text);
    } else {
      this.vnDisplay.hide();
      this.scene.sleep();
      setTimeout(() => this.scene.resume("MapScene"), 100);
    }
  }
}
