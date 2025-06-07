import type { GameObjects, Input } from "phaser";
import type StoryManager from "../../Plugins/StoryManager";
import type DatGui from "../../Plugins/DatGui";
import type { GridEngine, CharacterData } from "grid-engine";

import { Scene } from "phaser";
import TilemapSprite from "./GameObjects/TilemapSprite";
import UnitSprite from "./GameObjects/UnitSprite";
import ActionsMenu from "./GameObjects/ActionsMenu";
import MapSceneController from "./Controller";

export class MapScene extends Scene {
  declare storyManager: StoryManager;
  declare datGui: DatGui;
  declare gridEngine: GridEngine;

  declare actionsMenu: ActionsMenu;
  controller: MapSceneController;
  guiControllers: any[] = [];
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;

  //#region Lifecycle
  constructor() {
    super("MapScene");
    this.controller = new MapSceneController(this);
  }

  init(data: any) {
    this.mapa = data.mapa;
  }

  preload() {
    console.time("Map preload time");
    this.storyManager.setStory(this.mapa);

    let gui = this.datGui.gui.addFolder("Scene");
    this.guiControllers.push(gui.add(this.controller.actor, "currentState"));
    this.guiControllers.push(gui.add(this.controller.context, "activeUnit"));
    this.guiControllers.push(gui.add(this.game.loop, "actualFps"));
    gui = gui.addFolder("Target");
    this.guiControllers.push(gui.add(this.controller.context.target!, "x"));
    this.guiControllers.push(gui.add(this.controller.context.target!, "y"));
    console.timeEnd("Map preload time");
  }

  create() {
    console.time("Map create time");
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

    const gridEngineConfig = {
      layerOverlay: false,
      characters: [] as CharacterData[]
    };

    (
      this.tilemap.createFromObjects(
        "Chars",
        { classType: UnitSprite, ignoreTileset: false },
        true
      ) as UnitSprite[]
    ).forEach((unit) => {
      layer0.push(unit);
      gridEngineConfig.characters.push({
        id: unit.name,
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

    const { tileHeight, tileWidth } = this.tilemap;
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
    console.timeEnd("Map create time");
  }

  override update(_: number) {
    if (this.controller.context.target && this.controller.context.activeUnit) {
      this.guiControllers.forEach((c) => c.updateDisplay());
    }
  }
  //#endregion Base Methods

  //#region Public
  setUIEventListeners() {
    this.actionsMenu.on("action", ({ detail: action }: CustomEvent) =>
      this.controller.actionMenuClick(action)
    );

    this.input
      .on("pointerdown", (pointer: Input.Pointer) =>
        this.controller.onPointerDown(
          {
            pointer,
            target: this.#selectTile(pointer)
          },
          this.controller.context
        )
      )
      .on("pointerup", (pointer: Input.Pointer) =>
        this.controller.onPointerUp(
          {
            pointer,
            target: this.#selectTile(pointer)
          },
          this.controller.context
        )
      )
      .on("pointermove", (pointer: Input.Pointer) => {
        const event = { pointer, target: this.#selectTile(pointer) };
        if (pointer.isDown)
          this.controller.onPointerDrag(event, this.controller.context);
        else this.controller.onPointerHover(event, this.controller.context);
      });
  }

  renderPath(path: { x: number; y: number }[], clear: boolean = false) {
    const layer =
      this.tilemap.layers[this.tilemap.getLayerIndexByName("Overlay")]
        ?.tilemapLayer;

    const tileset = this.tilemap.getTileset("TilesetUI");
    if (!layer || !tileset) return;

    if (clear) layer.forEachTile((t) => (t.index = -1));

    let prev, pos, next, dir;
    const tileMappings: number[] = [];
    for (let i = 0; i < path.length; ++i) {
      pos = path[i];
      next = i < path.length - 1 ? path[i + 1] : null;

      dir = 0;
      if (prev) dir |= this.#direction(prev, pos);
      if (next) dir |= this.#direction(next, pos);
      dir |= next ? 0 : 0b10000;
      prev = pos;

      if (!tileMappings[dir]) {
        for (
          let ti = tileset.firstgid;
          ti < tileset.firstgid + tileset.total;
          ti++
        ) {
          const props: any = tileset.getTileProperties(ti);
          if (!props) continue;
          if (
            props["cap"] == (dir & 0b10000) >> 4 &&
            props["up"] == (dir & 0b01000) >> 3 &&
            props["right"] == (dir & 0b00100) >> 2 &&
            props["down"] == (dir & 0b00010) >> 1 &&
            props["left"] == (dir & 0b00001)
          ) {
            tileMappings[dir] = ti;
            break;
          }
        }
      }

      dir = tileMappings[dir];
      if (dir === undefined) continue;
      layer.getTileAt(pos.x, pos.y, true).index = dir;
    }
  }
  //#endregion Public

  //#region Private
  #direction(a: { x: number; y: number }, b: { x: number; y: number }) {
    let dir =
      (b.y - a.y == 0 ? 0 : 2 << (b.y - a.y + 1)) |
      (a.x - b.x == 0 ? 0 : 1 << (a.x - b.x + 1));
    return dir;
  }

  #selectTile(pointer: Input.Pointer) {
    const tilelayer = this.tilemap.layers[0].tilemapLayer;
    const { x, y } = tilelayer.worldToTileXY(pointer.worldX, pointer.worldY);
    const tile = tilelayer.getTileAt(x, y, true);
    if (!tile || this.controller.context.target == tile) return; // ignore out of bounds touches
    return tile;
  }
  //#endregion Private
}
