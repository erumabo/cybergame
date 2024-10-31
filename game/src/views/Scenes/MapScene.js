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
  mapa;

  constructor() {
    super("MapScene");
  }

  init(data) {
    this.gameController = new GameModel(gameConfig);
    //this.mapController = this.gameController.levels.at(0);
    this.mapView = document.createElement("mb-map-view");
    //this.mapView.model = this.mapController;

    this.mapa = "Bosque";
  }

  preload() {
    this.load.pack("juego", gameConfig.pack);
  }

  create() {
    this.tilemap = this.make.tilemap({
      key: this.mapa
    });

    const tilesets = this.tilemap.tilesets.map(({ name }) =>
      this.tilemap.addTilesetImage(name)
    );

    /*
    // Create MapModel for controller
    this.mapController.set({
      mapWidth: this.tilemap.width,
      mapHeight: this.tilemap.height
    });
*/

    let groundLayer = this.tilemap.createLayer("Suelo", tilesets);
    /*
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
    
    this.tilemap.createLayer("Decor", tilesets, 0.5, 0.5);
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
    */
    /*
    this.mapController.get("map").on("change:hint", tm => {
      let tint = 0xffffff;
      if (tm.get("hint") & Hints.Move) {
        tint = 0xa9c9ff;
      }
      this.tilemap.layers.forEach((_, i) => {
        let tile = this.tilemap.getTileAt(tm.get("x"), tm.get("y"), false, i);
        if (tile) tile.tint = tint;
      });
    });*/

    this.tilemap.layers
      .find(l => l.name == "Chars")
      ?.data.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col.properties["id"]) {
            const uctr = this.gameController.units.get(col.properties.id);
            console.log(uctr.get("id"));
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

    /*
    groundLayer.setInteractive().on("pointerdown", function (p) {
      if (this.scene.mapController.has("activeUnit")) {
        let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
        this.scene.mapController.set({
          target: this.scene.mapController.getTile(x, y)
        });
      }
    });
    */

    this.input.on("pointermove", p => {
      if (!p.isDown) return;
      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });

    const tileSize = this.tilemap.tileWidth;
    this.cameras.main.setBounds(
      -tileSize,
      -tileSize,
      (this.tilemap.height + 2) * tileSize,
      (this.tilemap.width + 2) * tileSize
    );

    document.getElementById("game-controlls").appendChild(this.mapView);
  }

  update(dt) {
    //this.mapController.update(dt);
  }
}
