import type { Scene } from "phaser";
import { GameObjects, FX } from "phaser";

import { COLORS } from "src/globals";
import Bar from "./Bar";
import UnitView from "../HTMLComponents/UnitView/UnitView";

export default class UnitSprite extends GameObjects.Container {
  declare sprite: GameObjects.Sprite;
  fx: Map<string, FX.Controller>;
  declare colorfx: FX.ColorMatrix;
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
    this.fx = new Map();

    this.on("setdata", (_: UnitSprite, key: string, value: number) => {
      switch (key) {
        case "current_hp":
          return this.#addBar(key, COLORS["--blue-40"], 0, value, value);
        case "hp":
          return this.setData("current_hp", value * 10);
        case "mp":
          return this.#addBar(key, COLORS["--green-10"], 0, value, value);
        default:
          return;
      }
    });

    this.on("changedata", (_: UnitSprite, key: string, value: number) => {
      this.#updateBar(key, value);
    });

    return new Proxy(this, {
      set(target: UnitSprite, property: string, value: any) {
        if (property == "displayWidth") {
          target.sprite && (target.sprite.displayWidth = value);
          target.bars.forEach((bar: Bar) => bar.setWidth(value));
          target.displayWidth = value;
          return value;
        } else if (property == "displayHeight") {
          target.sprite && (target.sprite.displayHeight = value);
          target.bars.forEach((bar: Bar) => bar.setWidth(value / 10));
          target.displayHeight = value;
          return value;
        }
        return Reflect.set(target, property, value);
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
      this.colorfx = this.sprite.postFX.addColorMatrix();
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

  get atk() {
    return this.getData("atk");
  }

  get def() {
    return this.getData("def");
  }

  get hp() {
    return this.getData("current_hp");
  }

  damage(val: number) {
    this.setData("current_hp", Math.max(0, this.hp - val));

    if (this.hp == 0) {
      this.colorfx.saturate(-1, false);
    }
  }

  setEffect(effect: string) {
    if (this.fx.has(effect)) return;
    let effectC;
    switch (effect) {
      case "glow":
        effectC = this.sprite.postFX.addGlow(COLORS["--white"]);
        break;
      default:
        return;
    }
    this.fx.set(effect, effectC);
  }

  removeEffect(effect: string) {
    if (!this.fx.has(effect)) return;
    this.sprite.postFX.remove(this.fx.get(effect)!);
    this.fx.delete(effect)
  }

  #addBar(
    stat: string,
    color: number,
    min: number = 0,
    value: number = 100,
    max: number = value
  ) {
    const width = this.displayWidth;
    const height = this.displayHeight / 10;
    const x = this.bars.size + 2;
    const y = this.displayHeight + (height + 2) * (this.bars.size - 1);

    const bar = new Bar(this.scene, x, y, width, height, color, min, max);
    bar.setValue(value);
    this.add(bar);

    this.bars.set(stat, bar);
  }

  #updateBar(stat: string, value: number) {
    if (!this.bars.has(stat)) return;
    this.bars.get(stat)!.setValue(value);
  }
}
