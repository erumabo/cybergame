import { Hints } from "/src/globals.js";
import { TileModel, TilesCollection } from "./TileModel";
import Backbone from "backbone";

export class MapModel extends Backbone.Model {
  get defaults() {
    return {
      width: 0,
      height: 0,
      map: new TilesCollection()
    };
  }
  constructor(gameController, levelConfig) {
    super(levelConfig);
    this.gameController = gameController;
    this.updateList = [];

    this.on("change:activeUnit", this.activateUnit);
  }

  getTile(x, y) {
    return this.get("map").get(x * this.get("mapHeight") + y);
  }

  setTile(tile) {
    this.get("map").set(
      {
        id: tile.x * this.get("mapHeight") + tile.y,
        ...tile
      },
      { remove: false }
    );
    this.trigger("change:tile");
  }

  inBound(x, y) {
    if (x < 0 || x >= this.get("mapWidth")) return false;
    if (y < 0 || y >= this.get("mapHeight")) return false;
    return true;
  }

  clearHint(hint = 0xff) {
    this.get("map").forEach(col =>
      col.set({
        hint: col.get("hint") & ~hint
      })
    );
    this.trigger("refresh");
  }

  update(dt) {
    this.updateList.forEach(i => i.update(dt));
  }

  activateUnit() {
    if (!this.has("activeUnit")) {
      //cleanup unit hints and timers
      //  and move to next turn
      this.clearHint();
      this.unset("target")
      return;
    }

    this.get("activeUnit").activate(this);
  }
}

export class MapsCollection extends Backbone.Collection {
  get model() {
    return MapModel;
  }
}
