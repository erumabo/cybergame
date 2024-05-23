import { Hints, UnitTypes, TileTypes } from "/src/globals.js";

const TileCosts = Object.keys(TileTypes).map(_ =>
  Object.keys(UnitTypes).map(_ => 0xffffff)
);

TileCosts[TileTypes.Ground][UnitTypes.Heavy] = 2;
TileCosts[TileTypes.Ground][UnitTypes.Light] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Archer] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Knight] = 1;

export class Attack {
  constructor(unit) {
    this.unit = unit;
    this.cd = true;
    this.distanceMap = [];
    this.name = "Atacar";
  }

  activate(map) {
    // uggly, clones map and clears Move hint
    map.clearHint(Hints.Attack);
    /*this.distanceMap = map
      .get("map")
      .models.map(c => ({ dist: 0xffffff, px: 0, py: 0 }));
*/
    //const queue = [];
    let x = this.unit.get("tileX"),
      y = this.unit.get("tileY");

    //queue.push([x, y]);
    /*this.distanceMap[x * map.get("mapHeight") + y] = {
      dist: 0,
      px: x,
      py: y
    };*/
    //map.setTile({ x, y, hint: map.getTile(x, y).hint | Hints.Move });

    //while (queue.length > 0) {
    //  [x, y] = queue.shift();
    let currTile = map.getTile(x, y);

    [
      [x - 1, y, "Right", "Left"],
      [x + 1, y, "Left", "Right"],
      [x, y - 1, "Bottom", "Top"],
      [x, y + 1, "Top", "Bottom"]
    ].forEach(([nx, ny, dirr, _dirr]) => {
      if (!map.inBound(nx, ny)) return false;

      let destTile = map.getTile(nx, ny);
      /*let newLength =
          this.distanceMap[x * map.get("mapHeight") + y].dist +
          TileCosts[destTile.get("type")][this.unit.get("type")];
        if (newLength > 1) return false;*/

      if (
        destTile.get("sides").includes(dirr) ||
        currTile.get("sides").includes(_dirr)
      )
        return false;
      /*
        if (this.distanceMap[nx * map.get("mapHeight") + ny].dist > newLength) {
          this.distanceMap[nx * map.get("mapHeight") + ny] = {
            dist: newLength,
            px: x,
            py: y
          };
          queue.push([nx, ny]);
*/
      if (destTile.get("units").length > 0) {
        map.setTile({
          id: destTile.id,
          hint: destTile.get("hint") | Hints.Attack
        });
      }
      //}
    });
    //}
  }

  validTarget(target, map) {
    return target.get("hint") & Hints.Attack;
  }

  use(target, map) {
    const unit = this.unit;

    target.get("units").forEach(tunit => {
      tunit.set({
        hp: tunit.get("hp") - unit.get("attack")
      });
    });
    
    this.unit.set({
      energy: 0
    })

    this.cd = true;
    map.unset("activeUnit");
    return true;
  }
}
