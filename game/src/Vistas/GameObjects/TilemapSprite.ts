import * as Phaser from "phaser";
import UnitSprite from "../GameObjectComponents/UnitSprite";

/*
  mapRotation(tile) {
    const rotations = [
      [0, 0],
      [1, 0],
      [1, 1],
      [3, 0],
      [1, 3],
      [3, 3],
      [6, 0],
      [7, 0],
      [1, 2],
      [6, 1],
      [3, 1],
      [7, 1],
      [3, 2],
      [7, 3],
      [7, 2],
      [15, 0]
    ];
    return rotations[tile];
  }*/

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export default class TilemapSprite extends Phaser.Tilemaps.Tilemap {
  tilesetImages: Phaser.Tilemaps.Tileset[];

  constructor(scene: Phaser.Scene, key: string) {
    const tilemapData = scene.cache.tilemap.get(key);
    const mapData = Phaser.Tilemaps.Parsers.Parse(
      key,
      tilemapData.format,
      tilemapData.data,
      0, //ignored for Tiled tilemap
      0, //ignored for Tiled tilemap
      true //default
    );
    super(scene, mapData);

    this.tilesetImages =
      this.tilesets
        ?.map(tileset => this.addTilesetImage(tileset.name))
        ?.filter(v => v != null) || [];
  }

  processLayer(
    layer: Phaser.Tilemaps.LayerData,
    tilesets: Phaser.Tilemaps.Tileset[]
  ) {
    if (layer.visible) {
      return this.createLayer(layer.name, tilesets);
    }

    if (layer.properties.some((prop: any) => prop.name == "dualgrid")) {
      const dual: Phaser.Tilemaps.TilemapLayer[] = [0, 1, 2, 3]
        .map(i =>
          this.createBlankLayer(
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
          this.createBlankLayer(
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
          clamp(0, tile.y - 1, layer.width - 1),
          clamp(0, tile.y, layer.width - 1),
          clamp(0, tile.x - 1, layer.height - 1),
          clamp(0, tile.x, layer.height - 1)
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
            let tiletypes = this.tilesets.find(tileset =>
              tileset.containsTileIndex(type)
            );
            if (tiletypes == null) return;
            return {
              id: type,
              //"z-index": +(
              //  tiletypes
              //    .getTileData(type)
              //    .properties.find(p => p.name == "z-index")?.value ?? 0
              //),
              firstgid: this.getTileset(tiletypes.name + "Dual")?.firstgid || 0,
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
}
