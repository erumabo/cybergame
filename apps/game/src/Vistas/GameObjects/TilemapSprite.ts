import * as Phaser from "phaser";
import UnitSprite from "./UnitSprite";

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

// Hack to suppport Tiled v1.2 up
Phaser.Tilemaps.Tileset.prototype.getTileProperties = function (
  tileIndex: number
) {
  return this.containsTileIndex(tileIndex)
    ? (this.getTileData(tileIndex) as any).properties
    : null;
};

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
    tilesets: Phaser.Tilemaps.Tileset[],
    index: number
  ) {
    if (layer.visible) {
      const vlayer = this.createLayer(layer.name, tilesets)!.setDepth(index);
      return vlayer;
    }

    if (layer.properties.some((prop: any) => prop.name == "dualgrid")) {
      const dual: Phaser.Tilemaps.TilemapLayer[] = [0, 1, 2, 3].map(i =>
        this.createBlankLayer(
          layer.name + "Dual" + i,
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        )!.setDepth(index)
      );

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
              firstgid: this.getTileset(tiletypes.name + "Dual")?.firstgid || 0,
              x: Math.floor(type / tiletypes.columns),
              y: (type % tiletypes.columns) - 1,
              tilesetWidth: tiletypes.columns
            };
          })
          .forEach((type: any, li: number) => {
            const pattern = tiles.map(t => +(t.index == type.id));
            type.x = type.x * 4 + pattern[0] * 2 + pattern[2];
            type.y = type.y * 4 + pattern[1] * 2 + pattern[3];

            const index =
              type.firstgid + type.x * type.tilesetWidth * 4 + type.y;
            dual[li].putTileAt(index, tile.x, tile.y);
          });
      });
      
      return dual[0];
    }
  }

  addOverlayLayer(tilesets: Phaser.Tilemaps.Tileset[], index: number) {
    const vlayer = this.createBlankLayer(
      "Overlay",
      tilesets,
      0,
      0,
      this.width,
      this.height,
      this.tileWidth,
      this.tileHeight
    )!.setDepth(index);
    return vlayer;
  }
}
