import * as Phaser from "phaser";
import anime from "animejs/lib/anime.es.js";

export default class UnitSprite extends Phaser.GameObjects.Container {
  sprite?: Phaser.GameObjects.Sprite;
  bars: Map<
    string,
    {
      progress: Phaser.GameObjects.Rectangle;
      border: Phaser.GameObjects.Rectangle;
    }
  >;

  constructor(scene: Phaser.Scene) {
    super(scene);

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

  /*setPosition(...position: number[]) {
    return super.setPosition(...position);
  }*/

  setTexture(key: string, frame: number, ...rest: any[]) {
    if (this.sprite) {
      this.sprite.setTexture(key, frame);
    } else {
      this.setUI(key, frame);
    }
    return this.sprite;
  }

  setFlip(x: boolean, y: boolean) {
    if (this.sprite) {
      return this.sprite.setFlip(x, y);
    }
  }

  setUI(key: string, frame: number) {
    this.sprite = this.scene.add.sprite(0, 0, key, frame);
    this.add(this.sprite);

    const tileSize = this.displayWidth;
    this.addBar("energy", 0, tileSize / 2, tileSize - 5, 5, 0xffff00);
    this.addBar("hp", 0, -tileSize / 2 - 5, tileSize - 5, 5, 0xff00f0);
  }

  /*
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
  */

  /*
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
  }*/

  /*
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
  }*/

  addBar(
    stat: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: number
  ) {
    const progress = this.scene.add.rectangle(x, y, width, height);
    const border = this.scene.add.rectangle(x, y, width, height);

    progress.setFillStyle(color, 1);
    border.setStrokeStyle(1, 0x000000);

    this.add(progress);
    this.add(border);

    this.bars.set(stat, { progress, border });

    /*this.getData("model").on("change:" + stat, () => {
      const percent =
        this.getData("model").get(stat) /
        (this.getData("model").has("max" + stat)
          ? this.getData("model").get("max" + stat)
          : 100.0);
      this.bars.get(stat).progress.setDisplaySize(width * percent, height);
    });*/
  }
}
