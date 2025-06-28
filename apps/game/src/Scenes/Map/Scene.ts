import type { GameObjects, Input, Tilemaps } from "phaser";
import type StoryManager from "../../Plugins/StoryManager";
import type DatGui from "../../Plugins/DatGui";
import type { GridEngine } from "grid-engine";

import { Scene, Math as PMath } from "phaser";
import TilemapSprite from "./GameObjects/TilemapSprite";
import UnitSprite from "./GameObjects/UnitSprite";
import ActionsMenu from "./GameObjects/ActionsMenu";
import MapSceneController from "./Controller";
import type GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js";

interface Propery {
  name: string;
  type?: string;
  value: any;
}

export class MapScene extends Scene {
  declare storyManager: StoryManager;
  declare datGui: DatGui;
  declare gridEngine: GridEngine;
  declare rexGestures: GesturesPlugin;

  declare actionsMenu: ActionsMenu;
  controller: MapSceneController;
  mapa!: string; // !: Type => trust me bro, this wont be null when i use it
  tilemap!: TilemapSprite;
  tileMappings: number[] = []; // memo for ui tiles, used for path arrows
  
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
      .concat(this.#spawnEnemies(worldConfig.characters))
      .concat(this.#spawnParty(worldConfig.party, worldConfig.characters));

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

    const mainChar = layer0[layer0.length - 1] as UnitSprite;
    this.cameras.main.centerOn(mainChar.x, mainChar.y);

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

    // To wait for second finger to land, so we dont missfire a "One finger press" event first
    // Time can be tuned
    const press = this.rexGestures.add.press({ time: 50 } as any);
    press.on("pressstart", () => {
      let pointers =
        (this.input.pointer1?.active || this.input.mousePointer?.active ? 1 : 0) +
        (this.input.pointer2?.active ? 1 : 0);
      const pointer = this.input.activePointer;
      const event = { pointer, target: this.#selectTile(pointer) };
      if (pointers === 1) {
        this.controller.onPointerDown(event, this.controller.context);
      } /**else {
        // two finger touch event
        // Unused for now
      }**/
    });
    press.on("pressend", () => {
      let pointers =
        (this.input.pointer1?.active || this.input.mousePointer?.active ? 1 : 0) +
        (this.input.pointer2?.active ? 1 : 0);
      const pointer = this.input.activePointer;
      const event = { pointer, target: this.#selectTile(pointer) };
      if (pointers === 0) {
        this.controller.onPointerUp(event, this.controller.context);
      } /**else {
        // two finger touch event ended, but one finger remains
        // Unused for now
      }**/
    });

    const pinch = this.rexGestures.add.pinch({} as any);
    pinch.on("drag1", (ev: any) => {
      // Ignore very small events, like a finger tremor
      // Threshold can be tuned
      if (Math.abs(ev.drag1Vector.x + ev.drag1Vector.y) < 0.5) return;
      const pointer = ev.pointers[0];
      const event = { pointer, target: this.#selectTile(pointer) };
      this.controller.onPointerDrag(event, this.controller.context);
    });
    pinch.on("pinch", (pinch: any) => {
      // Camera zoom speed, something to tune
      this.cameras.main.setZoom(
        PMath.Clamp(this.cameras.main.zoom + (pinch.scaleFactor), 0.1, 10)
      );
    });

    this.input.on("wheel", (_: any, __: any, ___:number, deltaY: number) => {
      // Camera zoom speed, something to tune
      this.cameras.main.setZoom(
        PMath.Clamp(this.cameras.main.zoom - (deltaY/100.0), 0.1, 10)
      );
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
    if (layer && clear) layer.forEachTile((t) => (t.index = -1));
    if (path.length < 2) return;

    const tileset = this.tilemap.getTileset("TilesetUI");
    if (!tileset) return;

    let pos = path[0],
      next = path[1],
      prev = pos;

    // First tile
    layer.getTileAt(pos.x, pos.y, true).index = this.#getArrowTile(
      this.#direction(next, pos),
      tileset
    );

    // Tiles [1, last)
    let i = 1;
    for (; i < path.length - 1; ) {
      pos = next;
      next = path[++i];
      layer.getTileAt(pos.x, pos.y, true).index = this.#getArrowTile(
        this.#direction(next, pos) | this.#direction(prev, pos),
        tileset
      );
      prev = pos;
    }

    // Last tile
    layer.getTileAt(next.x, next.y, true).index = this.#getArrowTile(
      0b10000 | this.#direction(pos, next),
      tileset
    );
  }
  //#endregion Public

  //#region Private
  #direction(a: { x: number; y: number }, b: { x: number; y: number }) {
    let dir =
      (b.y - a.y === 0 ? 0 : 2 << (b.y - a.y + 1)) |
      (a.x - b.x === 0 ? 0 : 1 << (a.x - b.x + 1));
    return dir;
  }

  #getArrowTile(dir: number, tileset: Tilemaps.Tileset): number {
    if (!this.tileMappings[dir]) {
      this.tileMappings[dir] = -1;
      for (
        let ti = tileset.firstgid;
        ti < tileset.firstgid + tileset.total;
        ti++
      ) {
        const props: any = tileset.getTileProperties(ti);
        if (!props) continue;
        if (
          !!(dir & 0b10000) === props["cap"] &&
          !!(dir & 0b01000) === props["up"] &&
          !!(dir & 0b00100) === props["right"] &&
          !!(dir & 0b00010) === props["down"] &&
          !!(dir & 0b00001) === props["left"]
        )
          return (this.tileMappings[dir] = ti);
      }
    }
    return this.tileMappings[dir];
  }

  #selectTile(pointer: Input.Pointer) {
    const tilelayer = this.tilemap.layers[0].tilemapLayer;
    const { x, y } = tilelayer.worldToTileXY(pointer.worldX, pointer.worldY);
    const tile = tilelayer.getTileAt(x, y, true);
    if (!tile) return; // ignore out of bounds touches
    return tile;
  }

  // Same as phaser ObjectHelper version, same behaviour
  #setTiledProperties(target: any, properties: Propery[]) {
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

  #spawnEnemies(charConfigs: { properties: Propery[] }[]) {
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
        model.every((prop: Propery) =>
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
