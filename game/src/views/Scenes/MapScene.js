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
    //this.mapView = document.createElement("mb-map-view");
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
    this.tilemap.layers.forEach(layer => {
      this.processLayer(layer, tilesets)
        .setInteractive()
        .on("pointerdown", function (p) {
          let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
          let tile = this.getTileAt(x, y, true);
          if (tile.index == -1) tile.index = 100;
          tile.tint = 0xa9c9ff;
          //else console.log(x, y, this);
        });
    });

    /*
    
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

    /*
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
      */

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

    //document.getElementById("game-controlls").appendChild(this.mapView);
  }

  clamp(min, val, max) {
    return Math.min(max, Math.max(min, val));
  }

  processLayer(layer, tilesets) {
    if (layer.visible) {
      return this.tilemap.createLayer(layer.name, tilesets);
    }

    if (layer.properties.some(prop => prop.name == "dualgrid")) {
      const dual = [
        this.tilemap.createBlankLayer(
          layer.name + "Dual0",
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        ),
        this.tilemap.createBlankLayer(
          layer.name + "Dual1",
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        ),
        this.tilemap.createBlankLayer(
          layer.name + "Dual2",
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        ),
        this.tilemap.createBlankLayer(
          layer.name + "Dual3",
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        ),
        this.tilemap.createBlankLayer(
          layer.name + "Dual4",
          tilesets,
          layer.x,
          layer.y,
          layer.width,
          layer.height,
          layer.tileWidth,
          layer.tileHeight
        )
      ];

      const tileTypes = this.tilemap.tilesets.find(t => t.name == "TileTypes");
      const tilesetWidth = tileTypes.columns;

      const firstgid = this.tilemap.tilesets.find(
        t => t.name == "Tileset"
      ).firstgid;

      dual[0].forEachTile(tile => {
        const tiles = [
          layer.data[this.clamp(0, tile.y - 1, layer.width - 1)][
            this.clamp(0, tile.x - 1, layer.height - 1)
          ],
          layer.data[this.clamp(0, tile.y, layer.width - 1)][
            this.clamp(0, tile.x - 1, layer.height - 1)
          ],
          layer.data[this.clamp(0, tile.y - 1, layer.width - 1)][
            this.clamp(0, tile.x, layer.height - 1)
          ],
          layer.data[this.clamp(0, tile.y, layer.width - 1)][
            this.clamp(0, tile.x, layer.height - 1)
          ]
        ];

        let types = [...new Set(tiles.map(t => t.index))];
        types
          .map(type => ({
            id: type,
            "z-index": +(
              tileTypes.tileData
                .find(tt => tt.id == type - tileTypes.firstgid)
                ?.properties.find(p => p.name == "z-index")?.value ?? 0
            )
          }))
          .sort((a, b) => a["z-index"] - b["z-index"])
          .forEach((type, li) => {
            const pattern = tiles.map(t => t.index == type.id);

            const mosaico = {
              x: Math.floor(type.id / tilesetWidth),
              y: (type.id % tilesetWidth) - 1
            };

            const b1 = (+pattern[0] << 1) + +pattern[2];
            const b2 = (+pattern[1] << 1) + +pattern[3];

            const index =
              firstgid +
              (mosaico.x * 4 + b1) * tilesetWidth * 4 +
              (mosaico.y * 4 + b2);

            if (li == 0) tile.index = index;
            else dual[li].putTileAt(index, tile.x, tile.y);
          });
      });

      return dual[4];
    }
  }

  update(dt) {
    //this.mapController.update(dt);
  }
}
