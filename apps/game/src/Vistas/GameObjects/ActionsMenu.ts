import * as Phaser from "phaser";
import { ActionsList } from "../UIComponents/mb-elements";

export default class ActionsMenu extends Phaser.GameObjects.DOMElement {
  container: Phaser.GameObjects.Container;
  domNode: ActionsList;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, new ActionsList(), "width: 64px; height: 40px;");

    this.domNode = this.node as ActionsList;
    this.addListener("action");

    // To stop events from propagating under the menu
    const background = this.scene.add
      .rectangle(0, 0, 64, 40, 0xe0c9a6, 0.9)
      .setStrokeStyle(1, 0, 1);
    background
      .setInteractive()
      .on("pointerdown", () => 1)
      .on("pointerup", () => 1);

    this.container = this.scene.add.container(100, 100);
    this.container.add(background);
    this.container.add(this);

    this.setOrigin(0, 0);
    background.setOrigin(0, 0);

    this.hide();
  }

  setPosition(...pos: number[]) {
    this.container?.setPosition(...pos);
    return super.setPosition(...pos);
  }

  show() {
    this.domNode.style.display = "block";
    this.domNode.style.width = "64px";
    this.container.setToTop();
    this.container.setVisible(true);
  }
  hide() {
    this.domNode.style.display = "none";
    this.domNode.style.width = "0";
    this.container.setToBack();
    this.container.setVisible(false);
  }
}
