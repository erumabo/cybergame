import * as Phaser from "phaser";

export class UnitSprite extends Phaser.GameObjects.Container {
  constructor(scene, x, y, unitSprite) {
    super(scene, x, y);
    
    this.sprite = scene.add.sprite(0, 0, unitSprite);
    this.add(this.sprite)
  }
}
