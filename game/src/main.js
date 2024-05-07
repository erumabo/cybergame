//import TileType from "./globals/globals.js";
import Alpine from 'alpinejs'
import * as Phaser from "phaser";
import { level } from "./levelConfig.js";
import { Hints, TileTypes, TileTypeConfig, TileCosts } from "./globals.js";
import { UnitController } from "./models/UnitController.js";
//import nipplejs from "nipplejs";

/*
class Unit {

  
}*/

class TileModel {
  type;
  units;
  hint = 0;

  constructor(definition, x, y) {
    this.x = x;
    this.y = y;
    this.type = definition.type;
    this.units = [];
    let config = TileTypeConfig[this.type];
    this.color = config.color;
    this.border = config.border;
  }
}

class MapModel {
  units = [];
  map = [];
  mapWidth = 0;
  mapHeight = 0;
  #unit_id = 0;
  #view;
  activeUnit;

  constructor(level) {
    level.forEach((row, y) => {
      this.map.push([]);
      this.mapHeight = Math.max(this.mapHeight, y);
      row.forEach((col, x) => {
        let tile = new TileModel(col, x, y);
        col.units?.forEach(u => {
          if (u != null) {
            let unit = new UnitController(++this.#unit_id, u);
            this.units.push(unit);
            tile.units.push(unit);
            unit.model.x = tile.x;
            unit.model.y = tile.y;
          }
        });
        this.map[y].push(tile);
        this.mapWidth = Math.max(this.mapWidth, x);
      });
    });
  }

  inBound(x, y) {
    if (x < 0 || x > this.mapWidth) return false;
    if (y < 0 || y > this.mapHeight) return false;
    return true;
  }

  moveUnit(newTile) {
    if (this.activeUnit == null || !(newTile.hint & Hints.Move)) return;
    let unit = this.units.find(u => u.model.id == this.activeUnit);
    let parentTile = this.map[unit.model.y][unit.model.x];
    let i = parentTile.units.findIndex(u => u.model.id == this.activeUnit);
    parentTile.units.splice(i, 1);

    newTile.units.push(unit);
    unit.model.x = newTile.x;
    unit.model.y = newTile.y;

    this.activeUnit = null;
    this.clearHint(Hints.Move);
  }

  clearHint(hint) {
    this.map.forEach(row => row.forEach(col => (col.hint &= !hint)));
  }
}

class MapView extends Phaser.Scene {
  #level;
  mapModel;

  constructor() {
    super("MapView");
  }

  init(data) {
    this.#level = level;
    this.mapModel = new MapModel(this.#level.map);
  }

  preload() {
    //this.load.image(level.bg);
    this.map = [];
    this.units = [];
  }
  create() {

    this.input.on("pointermove", p => {
      if(!p.isDown) return;
      this.cameras.main.scrollX -= p.x - p.prevPosition.x;
      this.cameras.main.scrollY -= p.y - p.prevPosition.y;
    });

    const tiles = this.add.container(0, 0);

    this.mapModel.map.forEach((row, y) => {
      this.map.push([]);
      row.forEach((col, x) => {
        let colTile = this.add.rectangle(
          x * this.#level.tileSize,
          y * this.#level.tileSize,
          this.#level.tileSize,
          this.#level.tileSize,
          col.color
        );
        tiles.add(colTile);
        this.map[y].push(colTile);
        colTile
          .setOrigin(0, 0)
          .setStrokeStyle(1, col.border)
          .setData("model", col)
          .setInteractive();
        colTile.on("pointerdown", function () {
          this.scene.mapModel.moveUnit(this.getData("model"));
        });

        col.units.forEach((u, k) => {
          let unit = this.add.star(
            this.#level.tileSize * (x + 0.5),
            this.#level.tileSize * (y + 0.5),
            u.model.type + 4,
            this.#level.tileSize / 5,
            this.#level.tileSize / 3,
            0xff0ff0
          );
          unit.setInteractive();
          unit.setData({
            model: u.model,
            controller: u
          });
          
          Alpine.effect(() => {
            unit.setPosition(
              this.#level.tileSize * (u.model.x + 0.5),
              this.#level.tileSize * (u.model.y + 0.5)
            );
          });
          
          unit.on("pointerdown", function () {
            if (this.scene.mapModel.activeUnit == this.getData("model").id) {
              this.scene.mapModel.activeUnit = null;
              this.scene.mapModel.clearHint(Hints.Move);
            } else {
              this.scene.mapModel.activeUnit = this.getData("model").id;
              this.getData("controller").availableTiles(this.scene.mapModel);
            }
          });

          this.units.push(unit);
        });
      });
    });

    this.cameras.main.setBounds(
      -this.#level.tileSize,
      -this.#level.tileSize,
      (this.mapModel.map[0].length + 2) * this.#level.tileSize,
      (this.mapModel.map.length + 2) * this.#level.tileSize
    );
  }

  update(dt) {
    
    this.map.forEach(row => {
      row.forEach(col => {
        let model = col.getData("model");
        let tint = model.color;
        if (model.hint & Hints.Move) {
          tint = 0x9090ff;
        }
        col.setFillStyle(tint);
      });
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#a0a0a0",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight / 2
  },
  scene: [
    //Boot,
    //Preloader,
    //MainMenu,
    MapView
  ]
};

Alpine.store("units", {});

Alpine.start();
const game = new Phaser.Game(config);
