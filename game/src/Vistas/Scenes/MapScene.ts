//import _ from "underscore";
import * as Phaser from "phaser";
import TilemapSprite from "../GameObjects/TilemapSprite";
import UnitSprite from "../GameObjects/UnitSprite";
import MapSceneController from "../../Controladores/Mapa/MapController";

export class MapScene extends Phaser.Scene {
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  controller: MapSceneController;
  units!: UnitSprite[];

  constructor() {
    super("MapScene");
    this.controller = new MapSceneController(this);
  }

  init(data: any) {
    this.mapa = data.mapa;
  }

  preload() {}

  create() {
    // Crear objectos
    this.tilemap = new TilemapSprite(this, this.mapa);

    this.tilemap.layers.forEach((layer, index) =>
      this.tilemap.processLayer(layer, this.tilemap.tilesetImages, index)
    );

    this.tilemap.addOverlayLayer(
      this.tilemap.tilesetImages,
      this.tilemap.layers.length + 1
    );

    const charsDepth = this.tilemap.layers.length + 2;
    this.units = this.tilemap.createFromObjects(
      "Chars",
      { classType: UnitSprite, ignoreTileset: false },
      true
    ) as UnitSprite[];
    this.units.forEach(unit => {
      this.controller.addUnitEntity(unit as UnitSprite);
      unit.setDepth(charsDepth);
    });

    const tileWidth = this.tilemap.tileWidth;
    const tileHeight = this.tilemap.tileHeight;
    this.cameras.main.setBounds(
      -tileWidth,
      -tileHeight,
      (this.tilemap.height + 2) * tileWidth,
      (this.tilemap.width + 2) * tileHeight
    );

    this.setUIEventListeners();
  }

  setUIEventListeners() {
    this.units.forEach(unit =>
      unit
        .setInteractive()
        .on(
          "pointerdown",
          function (this: UnitSprite, pointer: Phaser.Input.Pointer) {
            (this.scene as MapScene).controller.interaccionObjeto(pointer, this.getData("entity"));
          }
        )
    );

    this.tilemap.layers[
      this.tilemap.getLayerIndexByName("Overlay")
    ]?.tilemapLayer
      .setInteractive()
      .on(
        "pointerdown",
        function (
          this: Phaser.Tilemaps.TilemapLayer,
          pointer: Phaser.Input.Pointer
        ) {
          const { x, y } = this.worldToTileXY(pointer.worldX, pointer.worldY);
          (this.scene as MapScene).controller.interaccionMapa(
            pointer,
            this.getTileAt(x, y, true)
          );
        }
      );

    this.input.on("pointermove", (p: any) => {
      if (!p.isDown) return;
      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });
  }

  update(dt: number) {
    //this.controller.update(dt);
  }
}
