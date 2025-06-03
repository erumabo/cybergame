import type { Scene } from "phaser";
import { GameObjects } from "phaser";
import ActionsList from "../HTMLComponents/ActionsList/ActionsList";

export default class ActionsMenu extends GameObjects.DOMElement {
  container: GameObjects.Container;
  domNode: ActionsList;

  constructor(scene: Scene) {
    super(scene, 0, 0, new ActionsList());

    this.domNode = this.node as ActionsList;
    this.addListener("action");

    this.container = this.scene.add.container(0, 0);
    this.container.add(this);

    //const selectionr = this.scene.add
    //  .rectangle(-16, 16, 32, 32)
    //  .setStrokeStyle(2, 0xff0000, 1);

    this.container.add(
      this.scene.add.rectangle(-4, 28, 4, 4, 0, 0.8).setStrokeStyle(4, 0, 0.5)
    );
    this.container.add(
      this.scene.add.rectangle(-28, 4, 4, 4, 0, 0.8).setStrokeStyle(4, 0, 0.5)
    );
    this.container.add(
      this.scene.add.rectangle(-4, 4, 4, 4, 0, 0.8).setStrokeStyle(4, 0, 0.5)
    );
    this.container.add(
      this.scene.add.rectangle(-28, 28, 4, 4, 0, 0.8).setStrokeStyle(4, 0, 0.5)
    );

    this.setOrigin(0, 0);
    this.hide();
  }

  override setPosition(x: number, y: number, z?: number) {
    this.container?.setPosition(x, y, z);
    return super.setPosition(x + 16, y - 16, z);
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
