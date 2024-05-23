import _ from "underscore";
import * as Phaser from "phaser";
import { gameConfig } from "../../levelConfig.js";
import { Hints, TileTypes, TileTypeConfig } from "../../globals.js";
import GameModel from "../../Models/GameModel.js";
import { UnitSprite } from "../GameObjects/UnitSprite.js";
import { MapView } from "../UIComponents/MapView.js";

export class MapScene extends Phaser.Scene {
  mapController;
  gameController;

  constructor() {
    super("MapScene");
  }

  init(data) {
    this.gameController = new GameModel(gameConfig);
    this.mapController = this.gameController.levels.at(0);
    this.mapView = document.createElement("mb-map-view");
    this.mapView.model = this.mapController;
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
    this.tilemap = this.make.tilemap({
      key: "levelmap"
    });

    const tilesets = [];
    for (let tileset in this.mapController.get("tilesets")) {
      tilesets.push(this.tilemap.addTilesetImage(tileset, tileset));
    }

    // Create MapModel for controller
    this.mapController.set({
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
        ...TileTypeConfig[tile.properties.type]
      });
    });

    this.tilemap.createLayer("Decor", tilesets);
    this.tilemap.forEachTile(tile => {
      if (tile.index < 0) return;
      this.mapController.setTile({
        x: tile.x,
        y: tile.y,
        sides: _.union(
          this.mapController.getTile(tile.x, tile.y).sides,
          tile.properties.sides?.split(",").map(s => s.trim()) ?? []
        )
      });
    });

    this.mapController.get("map").on("change:hint", tm => {
      let tint = 0xffffff;
      if (tm.get("hint") & Hints.Move) {
        tint = 0xa9c9ff;
      }
      this.tilemap.layers.forEach((_, i) => {
        let tile = this.tilemap.getTileAt(tm.get("x"), tm.get("y"), false, i);
        if (tile) tile.tint = tint;
      });
    });

    this.tilemap.layers
      .find(l => l.name == "Chars")
      .data.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col.properties["id"]) {
            const uctr = this.gameController.units.get(col.properties.id);
            uctr.set({
              x: this.mapController.get("tileSize") * (x + 0.5),
              y: this.mapController.get("tileSize") * (y + 0.5),
              tileX: x,
              tileY: y,
              parent: this.mapController.getTile(x, y)
            });
            this.mapController.getTile(x, y).get("units").add(uctr);

            let unit = this.add.existing(new UnitSprite(this, uctr));

            this.mapController.updateList.push(uctr);
          }
        });
      });

    groundLayer.setInteractive().on("pointerdown", function (p) {
      if (this.scene.mapController.has("activeUnit")) {
        let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
        this.scene.mapController.set({
          target: this.scene.mapController.getTile(x, y)
        });
      }
    });

    this.input.on("pointermove", p => {
      if (!p.isDown) return;
      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });

    this.cameras.main.setBounds(
      -this.mapController.get("tileSize"),
      -this.mapController.get("tileSize"),
      (this.tilemap.height + 2) * this.mapController.get("tileSize"),
      (this.tilemap.width + 2) * this.mapController.get("tileSize")
    );

    document.getElementById("game-controlls").appendChild(this.mapView);
  }

  update(dt) {
    this.mapController.update(dt);
  }
}
