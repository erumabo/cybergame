import type { Scene } from "phaser";
import { GameObjects } from "phaser";

import Bar from "./Bar";
import ActionsMenu from "./ActionsMenu";
import { UnitView } from "../UIComponents/mb-elements";

export default class UnitSprite extends GameObjects.Container {
  sprite?: GameObjects.Sprite;
  bars: Map<string, Bar>;
  actionsMenu?: ActionsMenu;
  view: GameObjects.DOMElement;
  viewNode: UnitView;

  constructor(scene: Scene) {
    super(scene);
    this.setDataEnabled();

    this.bars = new Map();

    this.actionsMenu = new ActionsMenu(this.scene);
    this.actionsMenu.hide();
    this.add(this.actionsMenu);

    this.viewNode = new UnitView();
    this.view = this.scene.add.dom(0, -32, this.viewNode).setOrigin(0, 0);
    this.add(this.view);
    
    //this.add(this.scene.add.rectangle(0,0,32,32));

    Object.defineProperty(this, "displayWidth", {
      set: function (width: number) {
        this.sprite && (this.sprite.displayWidth = width);
      },
      get: function () {
        return this.sprite?.displayWidth ?? 0;
      }
    });
    Object.defineProperty(this, "displayHeight", {
      set: function (height: number) {
        this.sprite && (this.sprite.displayHeight = height);
      },
      get: function () {
        return this.sprite?.displayHeight ?? 0;
      }
    });
  }

  setTexture(key: string, frame: number, ..._: any[]) {
    if (this.sprite) {
      this.sprite.setTexture(key, frame);
    } else {
      this.add((this.sprite = this.scene.add.sprite(0, 0, key, frame)));
      this.setSize(this.sprite.displayWidth, this.sprite.displayHeight);
      this.sprite.setOrigin(0, 0);
    }
    return this.sprite;
  }

  setFlip(x: boolean, y: boolean) {
    if (this.sprite) {
      return this.sprite.setFlip(x, y);
    }
  }

  override setPosition(x: number, y: number) {
    return super.setPosition(x, y);
  }

  addBar(stat: string, color: number, value: number = 100) {
    const width = this.displayWidth;
    const height = this.displayHeight / 10;
    const x = this.bars.size + 2;
    const y = this.displayHeight + (height + 2) * (this.bars.size - 1);

    const bar = new Bar(this.scene, x, y, width, height, color).setFillPercent(
      value
    );
    this.add(bar);

    this.bars.set(stat, bar);
  }

  updateBar(stat: string, value: number) {
    if (!this.bars.has(stat)) throw new Error(`Bar for stat ${stat} not found`);

    this.bars.get(stat)!.setFillPercent(value);
  }

  setDOMAttribute(attribute: string, value: any) {
    this.viewNode.setAttribute(attribute, value);
  }
}
