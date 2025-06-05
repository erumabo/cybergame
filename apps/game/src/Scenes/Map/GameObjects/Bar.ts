import type { Scene } from "phaser";
import { GameObjects } from "phaser";

export default class Bar extends GameObjects.Container {
  progress: GameObjects.Rectangle;
  border: GameObjects.Rectangle;
  fillperc: number = 0;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ) {
    super(scene);
    
    this.width = width;
    this.height = height;

    this.border = scene.add
      .rectangle(0, 0, width, 1)
      .setStrokeStyle(1, 0)
      .setOrigin(0, 0);
    this.add(this.border);

    this.progress = scene.add
      .rectangle(0, 0, width, height)
      .setFillStyle(color, 1)
      .setStrokeStyle(1, 0)
      .setOrigin(0, 0);
    this.add(this.progress);

    this.setPosition(x, y);
  }

  setFillPercent(value: number = 0) {
    this.fillperc = value;
    this.progress.setDisplaySize(this.width * (this.fillperc / 100.0), this.height);
    return this;
  }

  setFillStyle(color: number = 0, alpha: number = 1) {
    this.progress.setFillStyle(color, alpha);
    return this;
  }

  setStrokeStyle(lineWidth: number = 1, color: number = 0, alpha: number = 1) {
    this.border.setStrokeStyle(lineWidth, color, alpha);
    this.progress.setStrokeStyle(lineWidth, color, alpha);
    return this;
  }
  
  setWidth(width: number) {
    this.width = width;
    this.border.setSize(this.width, this.height);
    this.progress.setSize(this.width * (this.fillperc / 100.0), this.height);
    return this;
  }
  
  setHeight(height: number) {
    this.height = height;
    this.border.setSize(this.width, this.height);
    this.progress.setSize(this.width * (this.fillperc / 100.0), this.height);
    return this;
  }
}
