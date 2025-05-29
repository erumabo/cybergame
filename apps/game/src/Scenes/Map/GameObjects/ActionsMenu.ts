import type { Scene } from "phaser";
import { GameObjects } from "phaser";
import ActionsList from "../HTMLComponents/ActionsList/ActionsList";

export default class ActionsMenu extends GameObjects.DOMElement {
  container: GameObjects.Container;
  domNode: ActionsList;

  constructor(scene: Scene) {
    super(scene, 0, 0, new ActionsList(), "width: 64px; height: 40px;");

    this.domNode = this.node as ActionsList;
    //this.domNode["actions"] = "Action,Action"
    this.addListener("action");

    // To stop events from propagating under the menu
    const background = this.scene.add
      .rectangle(16, -16, 64, 80, 0xe0c9a6, 1)
      .setStrokeStyle(1, 0, 1);
    background
      .setInteractive()
      .on("pointerdown", () => 1)
      .on("pointerup", () => 1);
      
    const selection = this.scene.add
      .rectangle(-16, 16, 32, 32)
      .setStrokeStyle(2, 0xff0000, 1);

    this.container = this.scene.add.container(0, 0);
    this.container.add(background);
    this.container.add(this);
    this.container.add(selection);

    this.setOrigin(0, 0);
    background.setOrigin(0, 0);

    this.hide();
  }

  override setPosition(x:number, y:number, z?:number) {
    this.container?.setPosition(x,y,z);
    return super.setPosition(x+16, y-16, z);
  }

  show() {
    this.domNode.show();
    this.container.setToTop();
    this.container.setVisible(true);
  }
  hide() {
    this.domNode.hide();
    this.container.setToBack();
    this.container.setVisible(false);
  }
}
