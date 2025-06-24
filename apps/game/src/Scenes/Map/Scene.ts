import type { GameObjects, Input } from "phaser";
import type StoryManager from "../../Plugins/StoryManager";
import type DatGui from "../../Plugins/DatGui";
import type { GridEngine } from "grid-engine";

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
    this.load.pack(this.mapa + "Pack", `assets/mapas/${this.mapa}/pack.json`);
    console.timeEnd("Map preload time");
  }

  create() {
    console.time("Map create time");
    this.storyManager.setStory(this.mapa);

    // Crear objectos

    // TODO: cargar el "saveFile" y combinarlo con el estado base global
    // Posiblemente esto se mueva a su propio servicio / syslayer
    let worldConfig = this.cache.json.get("WorldConfig");
    //let saveState = this.cache.json.get("SaveState");

    // Tilemap and tile objects layer
    let layer0: GameObjects.GameObject[] = [];
    this.tilemap = new TilemapSprite(this, this.mapa);

    // Each layer gets converted to a "real" visual layer game object
    //     or 4 in case of dual grid layers ( one per corner )
    this.tilemap.layers.forEach((layer, index) =>
      layer0.push(
        ...this.tilemap.processLayer(layer, this.tilemap.tilesetImages, index)!
      )
    );

    this.gridEngine.create(this.tilemap, {
      layerOverlay: false,
      characters: []
    });
    layer0 = layer0
      .concat(this.#spawnParty(worldConfig["party"], worldConfig.characters))
      .concat(this.#spawnEnemies(worldConfig.characters));

    this.add.layer().add(layer0);

    // Overlay and HUD layer
    this.actionsMenu = new ActionsMenu(this);
    this.add.existing(this.actionsMenu);
    let overlayLayer = this.tilemap.createOverlayLayer(
      this.tilemap.tilesetImages,
      this.tilemap.layers.length + 1
    );
    this.add.layer().add([overlayLayer, this.actionsMenu]);

    const { tileHeight, tileWidth } = this.tilemap;
    this.cameras.main.setBounds(
      -tileWidth,
      -tileHeight,
      (this.tilemap.height + 2) * tileWidth,
      (this.tilemap.width + 2) * tileHeight
    );
    this.cameras.main.setZoom(1.5);
    this.setUIEventListeners();
    console.timeEnd("Map create time");
  }

  override update(_: number) {}
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

    this.events.on("unitChange", ({ old: oldUnit, new: newUnit }: any) => {
      let sprite: UnitSprite;
      if (oldUnit) {
        sprite = this.gridEngine.getContainer(oldUnit) as UnitSprite;
        sprite.removeEffect("glow");
      }
      if (newUnit) {
        sprite = this.gridEngine.getContainer(newUnit) as UnitSprite;
        sprite.setEffect("glow");
      }
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
    if (!tile) return; // ignore out of bounds touches
    return tile;
  }

  // Same as phaser ObjectHelper version, same behaviour
  #setTiledProperties(target: any, properties: { name: string; value: any }[]) {
    properties.forEach((prop) => {
      if (target[prop.name] !== undefined) target[prop.name] = prop.value;
      else target.setData(prop.name, prop.value);
    });
  }

  #spawnCharacter(char: any, position: { x?: number; y?: number }) {
    let unit = new UnitSprite(this);

    unit.setName(char.name);
    unit.setPosition(position.x ?? 0, position.y ?? 0);
    unit.setTexture(char.spritesheet, char.frame);
    unit.displayWidth = char.width;
    unit.displayHeight = char.height;
    this.#setTiledProperties(unit, char.properties ?? []);

    this.add.existing(unit);
    this.gridEngine.addCharacter({
      id: unit.name,
      sprite: unit.sprite,
      container: unit,
      startPosition: {
        x: unit.x / this.tilemap.tileWidth,
        y: unit.y / this.tilemap.tileHeight
      }
    });

    return unit;
  }

  #spawnEnemies(
    charConfigs: { properties: { name: string; value: string }[] }[]
  ) {
    let spawned: UnitSprite[] = [];
    let spawnSpaces =
      this.tilemap
        .filterObjects("Chars", (obj: any) => obj.point && obj.type === "enemy")
        ?.sort((a, b) => b.id - a.id) ?? [];
    let enemies = charConfigs.filter((char) =>
      char.properties.some((p) => p.name == "faction" && p.value == "enemy")
    );

    for (let i = 0; i < spawnSpaces.length; ++i) {
      let model = spawnSpaces[i].properties ?? [];

      // First enemy that matches the model
      let enemy = enemies.find((enemy) =>
        model.every((prop: { name: string; value: string }) =>
          enemy.properties.some(
            (p) => p.name === prop.name && p.value === prop.value
          )
        )
      );

      if (!enemy) {
        console.warn(`Could not find enemy config for ${model}`);
      } else {
        spawned.push(this.#spawnCharacter(enemy, spawnSpaces[i]));
      }
    }

    return spawned;
  }

  #spawnParty(spawnChars: string[], charConfigs: any[]) {
    // reverse both arrays to "align" tails
    let characters = spawnChars.reverse();
    let spawnSpaces =
      this.tilemap
        .filterObjects(
          "Chars",
          (obj: any) => obj.point && obj.type === "character"
        )
        ?.sort((a, b) => b.id - a.id) ?? [];

    let spawned: UnitSprite[] = [];
    for (let i = 0; i < spawnSpaces.length && i < characters.length; ++i) {
      let char = charConfigs.find((char: any) => char.name === characters[i]);
      if (!char) {
        console.warn(`Unkwon character config ${characters[i]}`);
      } else {
        spawned.push(this.#spawnCharacter(char, spawnSpaces[i]));
      }
    }

    return spawned;
  }
  //#endregion Private
}
