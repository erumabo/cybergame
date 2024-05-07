import { UnitTypes, UnitConfig, Hints, TileCosts } from "/src/globals.js";
import Alpine from "alpinejs";

export class UnitController {
  model;

  constructor(id, type) {
    let unit = {
      id,
      type,
      x: 0,
      y: 0,
      ...UnitConfig[type]
    };
    Alpine.store("units")[id] = unit;
    this.model = Alpine.store("units")[id];
  }

  availableTiles(mapModel) {
    // uggly, clones map and clears Move hint
    const distanceMap = mapModel.map.map(m =>
      m.map(c => ((c.hint &= !Hints.Move), 0xffffff))
    );
    const queue = [];
    let x = this.model.x,
      y = this.model.y;

    queue.push([x, y]);
    distanceMap[y][x] = 0;
    mapModel.map[y][x].hint |= Hints.Move;

    while (queue.length > 0) {
      [x, y] = queue.shift();

      [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
      ].forEach(([nx, ny]) => {
        if (!mapModel.inBound(nx, ny)) return false;

        let destTile = mapModel.map[ny][nx];
        let newLength =
          distanceMap[y][x] + TileCosts[destTile.type][this.model.type];

        if (newLength <= this.model.power && distanceMap[ny][nx] > newLength) {
          distanceMap[ny][nx] = newLength;
          queue.push([nx, ny]);
          mapModel.map[ny][nx].hint |= Hints.Move;
        }
      });
    }
  }
}
