import * as Phaser from "phaser";
import anime from "animejs/lib/anime.es.js";

export class UnitSprite extends Phaser.GameObjects.Container {
  constructor(scene, model) {
    const x = model.get("x");
    const y = model.get("y");
    super(scene, x, y);

    this.setData({
      model
    });

    this.setUI();
    this.setEventListeners();
  }

  setUI() {
    this.sprite = this.scene.add.sprite(0, 0, this.getData("model").get("id"));
    this.add(this.sprite);

    const tileSize = this.scene.mapController.get("tileSize");
    this.bars = new Map();
    this.addBar("energy", 0, tileSize / 2, tileSize - 5, 5, 0xffff00);
    this.addBar("hp", 0, -tileSize / 2 - 5, tileSize - 5, 5, 0xff00f0);
  }

  setEventListeners() {
    this.getData("model").on("change:x change:y", () => {
      this.setPosition(
        this.getData("model").get("x"),
        this.getData("model").get("y")
      );
    });

    this.getData("model").on("dead", ()=>this.die());

    const tileSize = this.scene.mapController.get("tileSize");
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -tileSize / 2,
        -tileSize / 2,
        tileSize,
        tileSize
      ),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerdown", this.selectUnit);
  }

  selectUnit() {
    const map = this.scene.mapController;
    const model = this.getData("model");
    if (map.has("activeUnit")) {
      if (map.get("activeUnit") == model) {
        map.unset("activeUnit");
      } else {
        map.set({
          target: model.get("parent")
        });
      }
    } else {
      if (model.get("energy") == 100) {
        map.set({
          activeUnit: model
        });
      }
    }
  }

  die() {
    const model = this.getData("model");
    const map = this.scene.mapController;
    map.updateList.splice(
      map.updateList.findIndex(u => u.get("id") == model.get("id")),
      1
    );

    const tl = anime.timeline({
      easing: "linear",
      duration: 200
    });
    tl.add({
      targets: this,
      alpha: 0,
      tint: "#A0A0A0"
    });

    tl.finished.then(() => {
      if (model.has("parent")) {
        model.get("parent").get("units").remove(model);
      }
      model.set({
        parent: null,
        tileX: -2,
        tileY: -2,
        x: -2 * map.get("tileSize"),
        y: -2 * map.get("tileSize"),
        energy: 0
      });
    });
  }

  addBar(stat, x, y, width, height, color) {
    const progress = this.scene.add.rectangle(x, y, width, height);
    const border = this.scene.add.rectangle(x, y, width, height);

    progress.setFillStyle(color, 1);
    border.setStrokeStyle(1, 0x000000);

    this.add(progress);
    this.add(border);

    this.bars.set(stat, { progress, border });

    this.getData("model").on("change:" + stat, () => {
      const percent =
        this.getData("model").get(stat) /
        (this.getData("model").has("max" + stat)
          ? this.getData("model").get("max" + stat)
          : 100.0);
      this.bars.get(stat).progress.setDisplaySize(width * percent, height);
    });
  }
}
