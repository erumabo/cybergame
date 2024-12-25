import * as Phaser from "phaser";
import UnitModel from "./UnitModel";

export default class MapModel {
  tilemap?: Phaser.Tilemaps.Tilemap;
  activeUnit?: UnitModel;
  updateList:any[];
  
  constructor() {
    this.updateList = [];
  }

  getTile(x:number, y:number) {
    return this.tilemap?.getTileAt(x,y);
  }

  inBound(x:number, y:number) {
    if(!this.tilemap) return false;
    if (x < 0 || x >= this.tilemap.width) return false;
    if (y < 0 || y >= this.tilemap.height) return false;
    return true;
  }

  clearHint(hint = 0xff) {
  }

  update(dt:number) {
    this.updateList.forEach(i => i.update(dt));
  }

  activateUnit(unit:UnitModel) {
    /*if (!this.has("activeUnit")) {
      //cleanup unit hints and timers
      //  and move to next turn
      this.clearHint();
      this.unset("target");
      return;
    }

    this.get("activeUnit").activate(this);*/
  }
}
