import _ from "underscore";
import * as Phaser from "phaser";
import { gameConfig } from "./levelConfig.js";
import { Hints, TileTypes, UnitTypes, TileTypeConfig } from "./globals.js";
import GameModel from "./Models/GameModel.js";
import { UnitSprite } from "./views/GameObjects/UnitSprite.js";

class MapView extends Phaser.Scene {
  mapController;
  gameController;

  constructor() {
    super("MapView");
  }

  init(data) {
    this.gameController = new GameModel(gameConfig);
    this.mapController = this.gameController.levels.at(0);
  }

  preload() {
    for (let tileset in this.mapController.get("tilesets")) {
      this.load.image(
        tileset,
        this.mapController.get("baseURL") +
          this.mapController.get("tilesets")[tileset]
      );
    }

    this.load.tilemapTiledJSON(
      "levelmap",
      this.mapController.get("baseURL") + this.mapController.get("tilemap")
    );

    /*** this goes in game main preloader ***/
    this.gameController.units.models.forEach(unit => {
      this.load.image(unit.get("id"), `/assets/Chars/${unit.get("id")}.png`);
    });
  }

  create() {
    this.input.on("pointermove", p => {
      if (!p.isDown) return;
      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });

    this.tilemap = this.make.tilemap({
      key: "levelmap"
    });

    const tilesets = [];
    for (let tileset in this.mapController.get("tilesets")) {
      tilesets.push(this.tilemap.addTilesetImage(tileset, tileset));
    }

    // Create MapModel for controller
    this.mapController.set({
      map: Array.from(Array(this.tilemap.height)).map(_ =>
        Array.from(Array(this.tilemap.width))
      ),
      mapWidth: this.tilemap.width,
      mapHeight: this.tilemap.height
    });

    let groundLayer = this.tilemap.createLayer("Ground", tilesets);
    this.tilemap.forEachTile(tile => {
      this.mapController.setTile({
        x: tile.x,
        y: tile.y,
        hint: 0,
        type: TileTypes[tile.properties.type],
        sides: _.union(
          [],
          tile.properties.sides?.split(",").map(s => s.trim()) ?? []
        ),
        view: tile,
        ...TileTypeConfig[tile.properties.type]
      });
    });

    this.mapController.on("refresh", () =>
      this.mapController.get("map").forEach(row =>
        row.forEach(tile => {
          let tint = 0xffffff;
          if (tile.hint & Hints.Move) {
            tint = 0xa9c9ff;
          }
          tile.view.tint = tint;
        })
      )
    );

    this.tilemap.createLayer("Decor", tilesets);
    this.tilemap.forEachTile(tile => {
      if (tile.index < 0) return;
      this.mapController.getTile(tile.x, tile.y).sides = _.union(
        this.mapController.getTile(tile.x, tile.y).sides,
        tile.properties.sides?.split(",").map(s => s.trim()) ?? []
      );
    });

    this.tilemap.layers
      .find(l => l.name == "Chars")
      .data.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col.properties["id"]) {
            const uctr = this.gameController.units.get(col.properties.id);
            if (!uctr) return;

            uctr.set({
              x: this.mapController.get("tileSize") * (x + 0.5),
              y: this.mapController.get("tileSize") * (y + 0.5),
              tileX: x,
              tileY: y
            });

            let unit = this.add.existing(
              new UnitSprite(this, uctr.get("x"), uctr.get("y"), uctr.get("id"))
            );

            unit.setData({
              model: uctr
            });

            uctr.on("change:x change:y", () => {
              unit.setPosition(uctr.get("x"), uctr.get("y"));
            });

            unit.setInteractive(
              new Phaser.Geom.Rectangle(
                -this.mapController.get("tileSize") / 2,
                -this.mapController.get("tileSize") / 2,
                this.mapController.get("tileSize"),
                this.mapController.get("tileSize")
              ),
              Phaser.Geom.Rectangle.Contains
            );

            unit.on("pointerdown", function () {
              if (this.scene.mapController.has("activeUnit")) {
                //let targetUnit = this.scene.mapController.get("activeUnit");
                let target = this.getData("model");
                this.scene.mapController.target({
                  x: target.get("tileX"),
                  y: target.get("tileY")
                });
              } else {
                this.scene.mapController.set({
                  activeUnit: this.getData("model")
                });
              }
            });

            this.mapController.updateList.push(uctr);
          }
        });
      });

    groundLayer.setInteractive().on("pointerdown", function (p) {
      if (this.scene.mapController.has("activeUnit")) {
        let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
        this.scene.mapController.target({ x, y });
      }
    });

    this.cameras.main.setBounds(
      -this.mapController.get("tileSize"),
      -this.mapController.get("tileSize"),
      (this.tilemap.height + 2) * this.mapController.get("tileSize"),
      (this.tilemap.width + 2) * this.mapController.get("tileSize")
    );
  }

  update(dt) {
    this.mapController.update(dt);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: (2 * window.innerHeight) / 3
  },
  scene: [
    //Boot,
    //Preloader,
    //MainMenu,
    MapView
  ]
};

const game = new Phaser.Game(config);
