//import _ from "underscore";
import { Scene } from "phaser";
import type { GameObjects, Input } from "phaser";
import { ARROWS } from "src/globals";

import { Compiler } from "inkjs/full";
import TilemapSprite from "../GameObjects/TilemapSprite";
import UnitSprite from "../GameObjects/UnitSprite";
import ActionsMenu from "../GameObjects/ActionsMenu";
import MapSceneController from "../../Controladores/Mapa/MapController";
import StoryManager from "../../Plugins/StoryManager";
import DatGui from "../../Plugins/DatGui";
import { GridEngine, type CharacterData } from "grid-engine";

export class MapScene extends Scene {
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  controller: MapSceneController;
  units!: UnitSprite[];
  actionsMenu!: ActionsMenu;
  storyManager!: StoryManager;
  datGui!: DatGui;
  gridEngine!: GridEngine;
  guiControllers: any[] = [];

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

    const gui = this.datGui.gui.addFolder("Scene");
    this.guiControllers.push(gui.add(this.controller, "state"));
    this.guiControllers.push(gui.add(this.controller, "activeUnit"));
  }

  create() {
    // Crear objectos
    let layer0: GameObjects.GameObject[] = [];
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
    this.cameras.main.setZoom(1.5);

    this.actionsMenu = new ActionsMenu(this);
    this.add.existing(this.actionsMenu);
    this.add.layer().add([this.actionsMenu]);

    this.setUIEventListeners();
  }

  setUIEventListeners() {
    this.units.forEach(
      (unit) =>
        unit.sprite &&
        unit.sprite
          .setInteractive()
          .on("pointerup", function (this: UnitSprite, pointer: Input.Pointer) {
            (this.scene as MapScene).controller.interaccionObjeto(
              pointer,
              this.parentContainer.getData("entity")
            );
          })
    );

    this.actionsMenu.on("action", ({ detail: action }: CustomEvent) =>
      this.controller.actionMenuClick(action)
    );

    this.input.on(
      "pointerup",
      (
        //this: Tilemaps.TilemapLayer,
        pointer: Input.Pointer
      ) => {
        const tilelayer = this.tilemap.layers[0].tilemapLayer;
        if (pointer.getDistance() > 10) return; // ignore if this is after pan
        const { x, y } = tilelayer.worldToTileXY(
          pointer.worldX,
          pointer.worldY
        );
        const tile = tilelayer.getTileAt(x, y, true);
        if (!tile) return; // ignore out of bounds touches
        this.controller.interaccionMapa(pointer, tile);
      }
    );

    this.input.on("pointermove", (p: any) => {
      if (!p.isDown) return;

      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });
  }

  override update(_: number) {
    this.guiControllers.forEach((c) => c.updateDisplay());
    //this.controller.update(dt);
  }

  #direction(a: { x: number; y: number }, b: { x: number; y: number }) {
    let dir = 0b0000;
    switch (a.y - b.y) {
      case -1:
        dir |= 0b1000;
        break;
      case 1:
        dir |= 0b0010;
        break;
    }
    switch (b.x - a.x) {
      case -1:
        dir |= 0b0100;
        break;
      case 1:
        dir |= 0b0001;
        break;
    }
    return dir;
  }

  renderPath(path: { x: number; y: number }[], clear: boolean = false) {
    const layer =
      this.tilemap.layers[this.tilemap.getLayerIndexByName("Overlay")]
        ?.tilemapLayer;
    if (!layer) return;

    if (clear) layer.forEachTile((t) => (t.index = -1));

    let prev, pos, next;
    for (let i = 0; i < path.length; ++i) {
      pos = path[i];
      next = i < path.length - 1 ? path[i + 1] : null;

      let dir = 0;
      if (prev) dir |= this.#direction(prev, pos);
      if (next) dir |= this.#direction(next, pos);
      prev = pos;
      
      switch (dir) {
        case 0b0000:
          continue;
        case 0b1000:
          dir = i == 0 ? ARROWS.UP : ARROWS.END_UP;
          break;
        case 0b0100:
          dir = i == 0 ? ARROWS.RIGHT : ARROWS.END_RIGHT;
          break;
        case 0b0010:
          dir = i == 0 ? ARROWS.DOWN : ARROWS.END_DOWN;
          break;
        case 0b0001:
          dir = i == 0 ? ARROWS.LEFT : ARROWS.END_LEFT;
          break;
        case 0b1010:
          dir = ARROWS.UD;
          break;
        case 0b0101:
          dir = ARROWS.LR;
          break;
        case 0b1100:
          dir = ARROWS.UR;
          break;
        case 0b1001:
          dir = ARROWS.UL;
          break;
        case 0b0110:
          dir = ARROWS.DR;
          break;
        case 0b0011:
          dir = ARROWS.DL;
          break;
        default:
          continue;
      }
      
      layer.getTileAt(pos.x, pos.y, true).index = dir;

      //this.controller.setTileTint(pos, 0xdddddd);
    }
  }
}
