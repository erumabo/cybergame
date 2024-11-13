//import _ from "underscore";
import * as Phaser from "phaser";
import { World } from "../../mecs";
import { Hints, TileTypes, TileTypeConfig } from "../../globals.js";
import TilemapSprite from "../GameObjectComponents/Tilemap";
import UnitSprite from "../GameObjectComponents/UnitSprite";

import Position from "../../Componentes/Position";

export class MapScene extends Phaser.Scene {
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  world: World;

  constructor() {
    super("MapScene");
    this.world = new World();
    this.world.addComponent(Position);
  }

  init(data: any) {
    this.mapa = data.mapa;
  }

  preload() {}

  create() {
    // Crear objectos
    this.tilemap = new TilemapSprite(this, this.mapa);
    this.tilemap.layers.forEach(layer =>
      this.tilemap.processLayer(layer, this.tilemap.tilesetImages)
    );

    this.tilemap
      .createFromObjects("Chars", { classType: UnitSprite }, true)
      .forEach(unit => {
        const entity = this.world.addEntity();
        this.world.addEntityComponent(entity, new Position());
      });

    this.setUIEventListeners();
  }

  setUIEventListeners() {
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
  }

  update(dt: number) {
    //this.mapController.update(dt);
  }
}
