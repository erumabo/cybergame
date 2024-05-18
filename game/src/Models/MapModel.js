import { TileTypes, TileTypeConfig, Hints, TileCosts } from "/src/globals.js";
import Backbone from "backbone";

export class MapModel extends Backbone.Model {
  get defaults() {
    return {
      width: 0,
      height: 0,
      map: []
    };
  }
  constructor(gameController, levelConfig) {
    super(levelConfig);
    this.gameController = gameController;
    this.updateList = [];
    
    this.on("change:activeUnit", this.activateUnit)
  }

  getTile(x, y) {
    return this.get("map")[y][x];
  }

  setTile(tile) {
    this.get("map")[tile.y][tile.x] = tile;
    this.trigger("change:tile");
  }

  inBound(x, y) {
    if (x < 0 || x >= this.get("mapWidth")) return false;
    if (y < 0 || y >= this.get("mapHeight")) return false;
    return true;
  }

  clearHint(hint = 0xff) {
    this.get("map").forEach(row => row.forEach(col => (col.hint &= !hint)));
    this.trigger("refresh");
  }

  update(dt) {
    this.updateList.forEach(i => i.update(dt));
  }
  
  activateUnit() {
    if(!this.has("activeUnit")) {
      //cleanup unit hints and timers
      //  and move to next turn
      this.clearHint(Hints.Move);
      return;
    }
    
    this.get("activeUnit").activate(this);
  }
  
  target({x,y}) {
    console.debug(x,y)
    this.get("activeUnit").target(this, this.getTile(x,y));
  }
  
}

export class MapsCollection extends Backbone.Collection {
  get model() {
    return MapModel;
  }
}
