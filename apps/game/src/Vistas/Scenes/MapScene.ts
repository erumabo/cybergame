//import _ from "underscore";
import { Scene } from "phaser";
import type { GameObjects, Input } from "phaser";
import * as CONSTANTS from "src/globals";

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
  declare storyManager: StoryManager;
  declare datGui: DatGui;
  declare gridEngine: GridEngine;
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
    this.guiControllers.push(gui.add(this.game.loop, "actualFps"));
  }

  create() {
    // Crear objectos
    let layer0: GameObjects.GameObject[] = [];
    this.tilemap = new TilemapSprite(this, this.mapa);

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

  #selectTile(pointer: Input.Pointer) {
    const tilelayer = this.tilemap.layers[0].tilemapLayer;
    const { x, y } = tilelayer.worldToTileXY(pointer.worldX, pointer.worldY);
    const tile = tilelayer.getTileAt(x, y, true);
    if (!tile || this.controller.target == tile) return; // ignore out of bounds touches
    return tile;
  }

  setUIEventListeners() {
    this.actionsMenu.on("action", ({ detail: action }: CustomEvent) =>
      this.controller.actionMenuClick(action)
    );

    this.input.on("pointerdown", (p: Input.Pointer) => {
      this.controller.onPointerDown(p, this.#selectTile(p));
    });
    this.input.on("pointerup", (p: Input.Pointer) => {
      this.controller.onPointerUp(p, this.#selectTile(p));
    });
    this.input.on("pointermove", (p: Input.Pointer) => {
      if (!p.isDown) return;
      this.controller.onDrag(p, this.#selectTile(p));
    });
  }

  override update(_: number) {
    this.guiControllers.forEach((c) => c.updateDisplay());
  }

  #direction(a: { x: number; y: number }, b: { x: number; y: number }) {
    let dir =
      (b.y - a.y == 0 ? 0 : 2 << (b.y - a.y + 1)) |
      (a.x - b.x == 0 ? 0 : 1 << (a.x - b.x + 1));
    return dir;
  }

  renderPath(path: { x: number; y: number }[], clear: boolean = false) {
    const layer =
      this.tilemap.layers[this.tilemap.getLayerIndexByName("Overlay")]
        ?.tilemapLayer;
    if (!layer) return;

    if (clear) layer.forEachTile((t) => (t.index = -1));

    let prev, pos, next, dir;
    for (let i = 0; i < path.length; ++i) {
      pos = path[i];
      next = i < path.length - 1 ? path[i + 1] : null;

      dir = 0;
      if (prev) dir |= this.#direction(prev, pos);
      if (next) dir |= this.#direction(next, pos);
      prev = pos;

      dir = i == 0 ? CONSTANTS.dir_arrow_start[dir] : CONSTANTS.dir_arrow[dir];
      if (dir === undefined) continue;
      layer.getTileAt(pos.x, pos.y, true).index = dir;
    }
  }
}
