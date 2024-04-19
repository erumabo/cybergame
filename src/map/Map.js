export class Worldmap {
  constructor() {
    this.outline = new Map();
    this.currentTile = this.map = this.newTile(0,0,[]);
    
    this.outline.set([0,0],this.currentTile);
  }
  
  newTile(x,y,constrains){
    return new Worldtile(x,y,{name:null, constraints:[]});
  }
  
  goUp() {
    let nT = this.currentTile.siblings[Dir.UP];
    if(nT) return this.currentTile = nT;
    return this.currentTile = this._goToNew(this.currentTile.x, this.currentTile.y - 1);
  }
  goDown() {
    let nT = this.currentTile.siblings[Dir.DOWM];
    if(nT) return this.currentTile = nT;
    return this.currentTile = this._goToNew(this.currentTile.x, this.currentTile.y + 1);
  }
  goLeft() {
    let nT = this.currentTile.siblings[Dir.LEFT];
    if (nT) return this.currentTile = nT;
    return this.currentTile = this._goToNew(this.currentTile.x - 1, this.currentTile.y);
  }
  goRight() {
    let nT = this.currentTile.siblings[Dir.RIGHT];
    if (nT) return this.currentTile = nT;
    return this.currentTile = this._goToNew(this.currentTile.x + 1, this.currentTile.y);
  }
  
  // this assumes that tile at x,y is new tile, on the outline of map
  _goToNew(x,y) {
    let neighbors = [false,false,false,false];
    neighbors[Dir.UP]    = this.outline.get([x  ,y-1]);
    neighbors[Dir.DOWN]  = this.outline.get([x  ,y+1]);
    neighbors[Dir.LEFT]  = this.outline.get([x-1,y  ]);
    neighbors[Dir.RIGHT] = this.outline.get([x+1,y  ]);
    
    nt = this.newTile(
      x,y,
      neighbors.reduce(
        (acc,tile) => acc.concat(tile?.type.constrains), []));
    
    // set new tile as neighbor of neighbors 
    if(nt.siblings[Dir.UP] = neighbors[Dir.UP])
      neighbors[Dir.UP].siblings[Dir.DOWN] = nt;
      
    if(nt.siblings[Dir.DOWN] = neighbors[Dir.DOWN])
      neighbors[Dir.DOWN].siblings[Dir.UP] = nt;
      
    if(nt.siblings[Dir.LEFT] = neighbors[Dir.LEFT])
      neighbors[Dir.LEFT].siblings[Dir.RIGHT] = nt;
      
    if(nt.siblings[Dir.RIGHT] = neighbors[Dir.RIGHT])
      neighbors[Dir.RIGHT].siblings[Dir.LEFT] = nt;
      
    
    // rework outline
    for(let n in neighbors)
      if(n && n.siblings.every(s => s))
        this.outline.delete([n.x,n.y]);
    
    if(nt.siblings.some(s=>!s)) this.outline.set([nt.x,nt.y],nt);
    
    return nt;
  }
}

class Worldtile {
  constructory(x,y, type) {
    this.siblings = [false,false,false,false];
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  search(x,y) {
    if(x == this.x && y == this.y)
      return this;
    for(let c in this.siblings) {
      if(c && c.child) {
        let ret = c.node.search(x,y);
        if(ret) return ret;
      }
    }
    return false;
  }
  
  
}

const Dir = Object.freeze({
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
});