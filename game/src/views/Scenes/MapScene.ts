import _ from "underscore";
import * as Phaser from "phaser";
import { gameConfig } from "../../levelConfig.js";
import { Hints, TileTypes, TileTypeConfig } from "../../globals.js";
import GameModel from "../../Models/GameModel.js";
import { UnitSprite } from "../GameObjects/UnitSprite";
import { MapView } from "../UIComponents/MapView.js";

export class MapScene extends Phaser.Scene {
  mapController?: any;
  gameController?: GameModel;
  mapa: string;
  tilemap?: Phaser.Tilemaps.Tilemap;

  constructor() {
    super("MapScene");
    this.mapa = "";
  }

  init(data: any) {
    this.gameController = new GameModel(gameConfig);
    this.mapa = "Bosque";
  }

  preload() {
    this.load.pack("juego", gameConfig.pack);
  }

  create() {
    //this.mapController = this.gameController.levels.at(0);
    //this.mapView = document.createElement("mb-map-view");
    //this.mapView.model = this.mapController;

    this.tilemap = this.make.tilemap({
      key: this.mapa
    });

    const tilesets: Phaser.Tilemaps.Tileset[] =
      this.tilemap?.tilesets
        ?.map(tileset => this.tilemap?.addTilesetImage(tileset.name))
        ?.filter(v => v != null) || [];

    /*
    // Create MapModel for controller
    this.mapController.set({
      mapWidth: this.tilemap.width,
      mapHeight: this.tilemap.height
    });
    */

    this.tilemap.layers.forEach((layer: Phaser.Tilemaps.LayerData) => {
      this.processLayer(layer, tilesets);
    });

    this.tilemap.createFromObjects(
      "Chars",
      {
        classType: UnitSprite
      },
      true
    );

    /*
    this.tilemap.layers
      .find(l => l.name == "Chars")
      ?.data.forEach((row, y) => {
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
      });*/

    this.tilemap.layers[
      this.tilemap.getLayerIndexByName("SueloDual")
    ].tilemapLayer
      .setInteractive()
      .on("pointerdown", function (this: Phaser.Tilemaps.TilemapLayer, p: any) {
        let prevTile = this.getData("prevTile");
        if (prevTile) this.getTileAt(prevTile.x, prevTile.y, true).index = -1;

        let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
        let tile = this.getTileAt(x, y, true);
        tile.index = 3;
        this.setData("prevTile", { x, y });
      });

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
    groundLayer.setInteractive().on("pointerdown", function (p) {
      if (this.scene.mapController.has("activeUnit")) {
        let { x, y } = this.worldToTileXY(p.worldX, p.worldY);
        this.scene.mapController.set({
          target: this.scene.mapController.getTile(x, y)
        });
      }
    });
    */

    this.input.on("pointermove", (p: any) => {
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
    //this.cameras.main.setZoom(2);

    //document.getElementById("game-controlls").appendChild(this.mapView);
  }

  clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
  }

  processLayer(
    layer: Phaser.Tilemaps.LayerData,
    tilesets: Phaser.Tilemaps.Tileset[]
  ) {
    if (this.tilemap == null) return;

    if (layer.visible) {
      return this.tilemap.createLayer(layer.name, tilesets);
    }

    if (layer.properties.some((prop: any) => prop.name == "dualgrid")) {
      const dual: Phaser.Tilemaps.TilemapLayer[] = [0, 1, 2, 3]
        .map(
          i =>
            this.tilemap?.createBlankLayer(
              layer.name + "Dual" + i,
              tilesets,
              layer.x - layer.tileWidth / 2,
              layer.y - layer.tileHeight / 2,
              layer.width + 1,
              layer.height + 1,
              layer.tileWidth,
              layer.tileHeight
            )
        )
        .concat([
          this.tilemap?.createBlankLayer(
            layer.name + "Dual",
            tilesets,
            layer.x,
            layer.y,
            layer.width,
            layer.height,
            layer.tileWidth,
            layer.tileHeight
          )
        ])
        .filter(tilemap => tilemap != null);

      dual[0].forEachTile(tile => {
        const coords = [
          this.clamp(0, tile.y - 1, layer.width - 1),
          this.clamp(0, tile.y, layer.width - 1),
          this.clamp(0, tile.x - 1, layer.height - 1),
          this.clamp(0, tile.x, layer.height - 1)
        ];
        const tiles = [
          layer.data[coords[0]][coords[2]],
          layer.data[coords[1]][coords[2]],
          layer.data[coords[0]][coords[3]],
          layer.data[coords[1]][coords[3]]
        ];

        let types = [...new Set(tiles.map(t => t.index))];
        types
          .map((type: number) => {
            let tiletypes = this.tilemap?.tilesets?.find(tileset =>
              tileset.containsTileIndex(type)
            );
            if (tiletypes == null) return;
            return {
              id: type,
              //"z-index": +(
              //--  tiletypes
              //    .getTileData(type)
              //    .properties.find(p => p.name == "z-index")?.value ?? 0
              //),
              firstgid:
                this.tilemap?.getTileset(tiletypes.name + "Dual")?.firstgid ||
                0,
              x: Math.floor(type / tiletypes.columns),
              y: (type % tiletypes.columns) - 1,
              tilesetWidth: tiletypes.columns
            };
          })
          //.sort((a, b) => a["z-index"] - b["z-index"])
          .forEach((type: any, li: number) => {
            const pattern = tiles.map(t => +(t.index == type.id));
            type.x = type.x * 4 + pattern[0] * 2 + pattern[2];
            type.y = type.y * 4 + pattern[1] * 2 + pattern[3];

            const index =
              type.firstgid + type.x * type.tilesetWidth * 4 + type.y;
            dual[li].putTileAt(index, tile.x, tile.y);
          });
      });

      return dual[4];
    }
  }

  update(dt: number) {
    //this.mapController.update(dt);
  }
}
