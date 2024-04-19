export class Map {
  constructor(){
    this.map = [];
    this.pile = [];
    this.root = new MapChunk(0,0);
    
    this.outline = new Map();
  }
 /*
  addPiece(piece) {
    this.pile.push({
      ...piece,
      tags: new Set(piece.tags)
    });
  }
  */
  getTile(x,y) {
    return this.root.getTile(x,y);
  }
}

class MapChunk {
  constructor(ox, oy) {
    this.ox = ox;
    this.oy = oy;
    this.siblings = [false,false,false,false];
    this.children = [false,false,false,false];
  }
  
  getTile(x,y) {
    if(x==this.ox && y==this.oy) return this;

    let quadrant;
    if(x < this.ox) {
      //WEST
      if(y < this.oy) quadrant = quadrants.NW;
      else quadrant = quadrants.SW;
    } else {
      //EAST
      if(y< this.oy) quadrant = quadrants.NE;
      else quadrant = quadrants.SE;
    }
    
    if(this.children[quadrant])
      return this.children[quadrant].getTile(x,y);
    
    return this.children[quadrant] = new MapChunk(x,y);
  }
  
  searchTile(x,y) {
    if(x==this.ox && y==this.oy) return this;

    let quadrant;
    if(x < this.ox) {
      //WEST
      if(y < this.oy) quadrant = quadrants.NW;
      else quadrant = quadrants.SW;
    } else {
      //EAST
      if(y< this.oy) quadrant = quadrants.NE;
      else quadrant = quadrants.SE;
    }
    
    return this.children[quadrant]?.getTile(x,y);
  }
}

const directions = Object.freeze({
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
});
const quadrants = Object.freeze({
  NE: 0,
  SE: 1,
  SW: 2,
  NW: 3
});
