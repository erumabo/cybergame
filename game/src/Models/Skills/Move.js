import { Hints, TileCosts } from "/src/globals.js";

export class Move {
  activate(map, target) {
    // uggly, clones map and clears Move hint
    const distanceMap = map
      .get("map")
      .map(m => m.map(c => ((c.hint &= !Hints.Move), 0xffffff)));

    const queue = [];
    let x = this.get("tileX"),
      y = this.get("tileY");

    queue.push([x, y]);
    distanceMap[y][x] = 0;
    map.getTile(x, y).hint |= Hints.Move;

    while (queue.length > 0) {
      [x, y] = queue.shift();
      let currTile = map.getTile(x, y);

      [
        [x - 1, y, "Right", "Left"],
        [x + 1, y, "Left", "Right"],
        [x, y - 1, "Bottom", "Top"],
        [x, y + 1, "Top", "Bottom"]
      ].forEach(([nx, ny, dirr, _dirr]) => {
        if (!map.inBound(nx, ny)) return false;

        let destTile = map.getTile(nx, ny);
        let newLength =
          distanceMap[y][x] + TileCosts[destTile.type][this.get("type")];
        if (newLength > this.get("power")) return false;

        if (destTile.sides.includes(dirr) || currTile.sides.includes(_dirr))
          return false;

        if (distanceMap[ny][nx] > newLength) {
          distanceMap[ny][nx] = newLength;
          queue.push([nx, ny]);
          destTile.hint |= Hints.Move;
        }
      });
    }
    map.trigger("refresh");
  }

  validTarget(map, target) {
    return map.getTile(target.x, target.y).hint & Hints.Move;
  }

  use(map, target) {
    if (!(target.hint & Hints.Move)) return false;
    //let unit = map.gameController.units.get(map.get("activeUnit"));
    this.set({
      x: (target.x + 0.5) * map.get("tileSize"),
      y: (target.y + 0.5) * map.get("tileSize"),
      tileX: target.x,
      tileY: target.y
    });

    map.unset("activeUnit");

    return true;
  }
}
