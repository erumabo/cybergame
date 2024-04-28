//import TileType from "./globals/globals.js";
import * as Phaser from "phaser";

class TileModel {
    walkable;
    unitsLocated;

    constructor(walkable) {
        this.walkable = !!walkable;
        this.unitsLocated = [];
    }
}

class MapModel {
    map;
    #view;
    constructor(level) {
        this.map = [];
        level.forEach((row, i) => {
            this.map.push([]);
            row.forEach((col, j) => {
                this.map[i].push(new TileModel(col));
            });
        });
    }
}

class Unit {
    #type;
    #power;
    #attack;
    #defense;
    #hp;
    #currTile;

    #view;

    canGo(currTile, newTile) {
        return true;
    }
}

class UnitBuilder {
    static createUnit(type) {
        return new Unit();
    }
}

const level = {
    bg: "/assets/level01/bg.png",
    map: [
        //in future, units position will also go here
        [1, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1]
    ]
};

class MapView extends Phaser.Scene {
    #level;
    #mapModel;

    constructor() {
        super("MapView");
    }

    init(data) {
        this.#level = level;
        this.#mapModel = new MapModel(this.#level.map);
    }

    preload() {
        //this.load.image(level.bg);
        this.map = [];
        
        this.#mapModel.map.forEach((row,i)=> {
          this.map.push([]);
          row.forEach((col,j) => {
            this.map[i].push(this.add.rectangle(j*120,i*120,120,120, col.walkable ? 0xffffff : 0x000000));
            this.map[i][j].setOrigin(0,0);
            this.map[i][j].setStrokeStyle(1,col.walkable? 0x000000: 0xffffff);
          })
        })
    }

    create() {}

    update() {}
}

//const gameMap = new Map(level.map);

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#a0a0a0',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        //Boot,
        //Preloader,
        //MainMenu,
        MapView
    ]
};

const game = new Phaser.Game(config);