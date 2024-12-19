//import _ from "underscore";
import * as Phaser from "phaser";

 // @ts-ignore
import { Compiler } from "inkjs/full";
import TilemapSprite from "../GameObjects/TilemapSprite";
import UnitSprite from "../GameObjects/UnitSprite";
import ActionsMenu from "../GameObjects/ActionsMenu";
import MapSceneController from "../../Controladores/Mapa/MapController";
import StoryManager from "../../Plugins/StoryManager";

export class MapScene extends Phaser.Scene {
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  controller: MapSceneController;
  units!: UnitSprite[];
  actionsMenu!: ActionsMenu;
  storyManager!: StoryManager;

  constructor() {
    super("MapScene");
    this.controller = new MapSceneController(this);
  }

  init(data: any) {
    console.log(data)
    this.mapa = data.mapa;
  }

  preload() {
    if (!this.cache.custom.ink.has(this.mapa)) {
      const storyInk = this.cache.text.get("story_" + this.mapa);
      const story = new Compiler(storyInk).Compile();
      this.cache.custom.ink.add(this.mapa, story);
    }
    this.storyManager.setStory(this.cache.custom.ink.get(this.mapa));
  }

  create() {
    // Crear objectos
    this.tilemap = new TilemapSprite(this, this.mapa);
    this.controller.tilemap = this.tilemap;

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
    this.cameras.main.setZoom(1.2);

    this.actionsMenu = new ActionsMenu(this);
    this.add.existing(this.actionsMenu);
    this.actionsMenu.setDepth(100);

    this.setUIEventListeners();
  }

  setUIEventListeners() {
    this.units.forEach(unit =>
      unit
        .setInteractive()
        .on(
          "pointerdown",
          function (this: UnitSprite, pointer: Phaser.Input.Pointer) {
            (this.scene as MapScene).controller.interaccionObjeto(
              pointer,
              this.getData("entity")
            );
          }
        )
    );

    this.actionsMenu.on("action", ({ detail: action }: CustomEvent) =>
      this.controller.actionMenuClick(action)
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
