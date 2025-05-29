import type { Scene } from "phaser";
import { Tilemaps } from "phaser";

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export default class TilemapSprite extends Tilemaps.Tilemap {
  tilesetImages: Tilemaps.Tileset[];

  constructor(scene: Scene, key: string) {
    const tilemapData = scene.cache.tilemap.get(key);
    const mapData = Tilemaps.Parsers.Parse(
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
        ?.map((tileset) => this.addTilesetImage(tileset.name))
        ?.filter((v) => v != null) || [];
  }

  processLayer(
    layer: Tilemaps.LayerData,
    tilesets: Tilemaps.Tileset[],
    _: number
  ) {
    if (layer.visible) {
      const vlayer = this.createLayer(layer.name, tilesets)!;
      return [vlayer];
    }

    if (layer.properties.some((prop: any) => prop.name == "dualgrid")) {
      const vlayer = this.createLayer(layer.name, tilesets)!;
      return [vlayer, ...this.createDualLayers(layer, tilesets)];
    }
  }

  createDualLayers(
    layer: Tilemaps.LayerData,
    tilesets: Tilemaps.Tileset[]
  ) {
    const corners = [0, 1, 2, 3].map(
      (i) =>
        this.createBlankLayer(
          layer.name + "#" + i,
          tilesets,
          layer.x - layer.tileWidth / 2,
          layer.y - layer.tileHeight / 2,
          layer.width + 1,
          layer.height + 1,
          layer.tileWidth,
          layer.tileHeight
        )!
    );

    corners[0].forEachTile((tile) => {
      const coords = [
        clamp(0, tile.y, layer.width - 1),
        clamp(0, tile.x, layer.height - 1),
        clamp(0, tile.y - 1, layer.width - 1),
        clamp(0, tile.x - 1, layer.height - 1)
      ];
      const tiles = [
        layer.data[coords[2]][coords[3]].index,
        layer.data[coords[0]][coords[3]].index,
        layer.data[coords[2]][coords[1]].index,
        layer.data[coords[0]][coords[1]].index
      ];

      let types = [...new Set(tiles)];
      types.forEach((id: number, li: number) => {
        let tiletypes = this.tilesets.find((tileset) =>
          tileset.containsTileIndex(id)
        );
        if (tiletypes == null) return;
        const type = {
          id,
          firstgid: this.getTileset(tiletypes.name + "Dual")?.firstgid || 0,
          x: Math.floor(id / tiletypes.columns) << 2,
          y: ((id % tiletypes.columns) - 1) << 2,
          tilesetWidth: tiletypes.columns
        };

        const pattern = tiles.map((t) => +(t == id));
        type.x = type.x | (pattern[0] << 1) | pattern[2];
        type.y = type.y | (pattern[1] << 1) | pattern[3];

        const index = type.firstgid + type.x * type.tilesetWidth * 4 + type.y;
        corners[li].putTileAt(index, tile.x, tile.y);
      });
    });

    return corners;
  }

  createOverlayLayer(tilesets: Tilemaps.Tileset[], index: number) {
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
