import * as Phaser from "phaser";
import anime from "animejs/lib/anime.es.js";
import Bar from "./Bar";

export default class UnitSprite extends Phaser.GameObjects.Container {
  sprite?: Phaser.GameObjects.Sprite;
  bars: Map<string, Bar>;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.setDataEnabled();

    this.bars = new Map();
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

  setTexture(key: string, frame: number, ...rest: any[]) {
    if (this.sprite) {
      this.sprite.setTexture(key, frame);
    } else {
      this.add((this.sprite = this.scene.add.sprite(0, 0, key, frame)));
      this.setSize(this.sprite.displayWidth, this.sprite.displayHeight);
    }
    return this.sprite;
  }

  setFlip(x: boolean, y: boolean) {
    if (this.sprite) {
      return this.sprite.setFlip(x, y);
    }
  }

  addBar(stat: string, color: number, value: number = 100) {
    const width = this.displayWidth;
    const height = this.displayHeight / 10;
    const x = this.bars.size + 2;
    const y = this.displayHeight / 2 + (height + 2) * this.bars.size - 2;

    const bar = new Bar(this.scene, x, y, width, height, color).setFillPercent(value);
    this.add(bar);

    this.bars.set(stat, bar);
  }

  updateBar(stat: string, value: number) {
    if (!this.bars.has(stat)) throw new Error(`Bar for stat ${stat} not found`);

    this.bars.get(stat)!.setFillPercent(value);
  }
}
