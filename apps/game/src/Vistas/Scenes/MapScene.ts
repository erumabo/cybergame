//import _ from "underscore";
import * as Phaser from "phaser";

// @ts-ignore
import { Compiler } from "inkjs/full";
import TilemapSprite from "../GameObjects/TilemapSprite";
import UnitSprite from "../GameObjects/UnitSprite";
import ActionsMenu from "../GameObjects/ActionsMenu";
import MapSceneController from "../../Controladores/Mapa/MapController";
import StoryManager from "../../Plugins/StoryManager";
import { GridEngine, type CharacterData } from "grid-engine";

export class MapScene extends Phaser.Scene {
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  controller: MapSceneController;
  units!: UnitSprite[];
  actionsMenu!: ActionsMenu;
  storyManager!: StoryManager;
  gridEngine!: GridEngine;

  constructor() {
    super("MapScene");
    this.controller = new MapSceneController(this);
  }

  init(data: any) {
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
    let layer0: Phaser.GameObjects.GameObject[] = [];
    this.tilemap = new TilemapSprite(this, this.mapa);
    this.controller.tilemap = this.tilemap;

    this.tilemap.layers.forEach((layer, index) =>
      layer0.push(
        ...this.tilemap.processLayer(layer, this.tilemap.tilesetImages, index)!
      )
    );

    layer0.push(
      this.tilemap.createOverlayLayer(
        this.tilemap.tilesetImages,
        this.tilemap.layers.length + 1
      )
    );

    //const charsDepth = this.tilemap.layers.length + 2;
    this.units = this.tilemap.createFromObjects(
      "Chars",
      { classType: UnitSprite, ignoreTileset: false },
      true
    ) as UnitSprite[];

    const gridEngineConfig = {
      layerOverlay: false,
      characters: [] as CharacterData[]
    };

    this.units.forEach((unit) => {
      const entity = this.controller.addUnitEntity(unit as UnitSprite);
      layer0.push(unit);
      gridEngineConfig.characters.push({
        id: "" + entity,
        sprite: unit.sprite,
        container: unit,
        startPosition: {
          x: (unit.x - 16) / this.tilemap.tileWidth,
          y: (unit.y + 16) / this.tilemap.tileHeight
        }
      });
    });
    this.add.layer().add(layer0);
    this.gridEngine.create(this.tilemap, gridEngineConfig);

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
    this.add.layer().add([this.actionsMenu]);

    this.setUIEventListeners();
  }

  setUIEventListeners() {
    this.units.forEach((unit) =>
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

  override update(_: number) {
    //this.controller.update(dt);
  }
}
