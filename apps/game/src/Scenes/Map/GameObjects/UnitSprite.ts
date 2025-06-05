import type { Scene } from "phaser";
import { GameObjects } from "phaser";

import { COLORS } from "src/globals";
import Bar from "./Bar";
import UnitView from "../HTMLComponents/UnitView/UnitView";

export default class UnitSprite extends GameObjects.Container {
  sprite?: GameObjects.Sprite;
  bars: Map<string, Bar>;
  view: GameObjects.DOMElement;
  viewNode: UnitView;

  constructor(scene: Scene) {
    super(scene);
    this.setDataEnabled();

    this.viewNode = new UnitView();
    this.view = this.scene.add.dom(0, -32, this.viewNode).setOrigin(0, 0);
    this.add(this.view);

    this.bars = new Map();

    this.on("setdata", (_: UnitSprite, key: string, value: number) => {
      let color: string = "";
      switch (key) {
        case "hp":
          color = "--blue-40";
          break;
        case "mp":
          color = "--green-10";
          break;
        default:
          return;
      }
      this.#addBar(key, COLORS[color], value);
    });

    this.on("changedata", (_: UnitSprite, key: string, value: number) => {
      try {
        this.#updateBar(key, value);
      } catch(_) {}
    });

    Object.defineProperty(this, "displayWidth", {
      set: function (width: number) {
        this.sprite && (this.sprite.displayWidth = width);
        this.bars.forEach((bar: Bar) => bar.setWidth(width));
      },
      get: function () {
        return this.sprite?.displayWidth ?? 0;
      }
    });
    Object.defineProperty(this, "displayHeight", {
      set: function (height: number) {
        this.sprite && (this.sprite.displayHeight = height);
        this.bars.forEach((bar: Bar) => bar.setWidth(height / 10));
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

  setDOMAttribute(attribute: string, value: any) {
    this.viewNode.setAttribute(attribute, value);
  }

  setStat(stat: string, value: number) {
    this.data.set(stat, value);
  }

  getStat(stat: string) {
    return this.data.get(stat);
  }

  #addBar(stat: string, color: number, value: number = 100) {
    const width = this.displayWidth;
    const height = this.displayHeight / 10;
    const x = this.bars.size + 2;
    const y = this.displayHeight + (height + 2) * (this.bars.size - 1);

    const bar = new Bar(this.scene, x, y, width, height, color);
    bar.setFillPercent(value);
    this.add(bar);

    this.bars.set(stat, bar);
  }

  #updateBar(stat: string, value: number) {
    if (!this.bars.has(stat)) throw new Error(`Bar for stat ${stat} not found`);
    this.bars.get(stat)!.setFillPercent(value);
  }
}
