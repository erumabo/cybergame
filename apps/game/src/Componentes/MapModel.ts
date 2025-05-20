import type { Tilemaps } from "phaser";

export default class MapModel {
  tilemap?: Tilemaps.Tilemap;
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

  clearHint() {
  }

  update(dt:number) {
    this.updateList.forEach(i => i.update(dt));
  }

}
