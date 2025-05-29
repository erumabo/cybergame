import type { Scene } from "phaser";
import { GameObjects } from "phaser";
import VNTextDisplay from "../HTMLComponents/VNTextDisplay/VNTextDisplay";

export default class VNDisplay extends GameObjects.DOMElement {
  container: GameObjects.Container;
  domNode: VNTextDisplay;

  constructor(scene: Scene, width: number, height: number) {
    super(
      scene,
      0,
      0,
      new VNTextDisplay(),
      `width: ${width}px; height: ${height}px;`
    );

    this.domNode = this.node as VNTextDisplay;
    this.addListener("action");

    // To stop events from propagating under the menu
    const background = this.scene.add
      .rectangle(0, 0, width, height, 0xe0c9a6, 0.9)
      .setStrokeStyle(1, 0, 1);
    background
      .setInteractive()
      .on("pointerdown", () => this.emit("pointerdown"))
      .on("pointerup", () => this.emit("pointerup"));

    this.container = this.scene.add.container(0, 0);
    this.container.add(background);
    this.container.add(this);

    this.setOrigin(0, 0);
    background.setOrigin(0, 0);

    this.hide();
  }

  override setPosition(...pos: number[]) {
    this.container?.setPosition(...pos);
    return this; //super.setPosition(...pos);
  }

  show() {
    this.domNode.style.display = "block";
    //this.domNode.style.width = "64px";
    this.container.setToTop();
    this.container.setVisible(true);
  }

  hide() {
    this.domNode.style.display = "none";
    //this.domNode.style.width = "0";
    this.container.setToBack();
    this.container.setVisible(false);
  }
}
