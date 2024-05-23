import { Hints, TileTypes, UnitTypes } from "/src/globals.js";
import anime from "animejs/lib/anime.es.js";

const TileCosts = Object.keys(TileTypes).map(_ =>
  Object.keys(UnitTypes).map(_ => 0xffffff)
);

TileCosts[TileTypes.Ground][UnitTypes.Heavy] = 2;
TileCosts[TileTypes.Ground][UnitTypes.Light] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Archer] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Knight] = 1;

export class Move {
  constructor(unit) {
    this.unit = unit;
    this.cd = false;
    this.distanceMap = [];
    this.name = "Moverse"
  }

  activate(map) {
    if(this.cd) return false;
    
    // uggly, clones map and clears Move hint
    map.clearHint(Hints.Move);
    this.distanceMap = map
      .get("map")
      .models.map(c => ({ dist: 0xffffff, px: 0, py: 0 }));

    const queue = [];
    let x = this.unit.get("tileX"),
      y = this.unit.get("tileY");

    queue.push([x, y]);
    this.distanceMap[x * map.get("mapHeight") + y] = {
      dist: 0,
      px: x,
      py: y
    };
    map.setTile({ x, y, hint: map.getTile(x, y).hint | Hints.Move });

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
          this.distanceMap[x * map.get("mapHeight") + y].dist +
          TileCosts[destTile.get("type")][this.unit.get("type")];
        if (newLength > this.unit.get("power")) return false;

        if (
          destTile.get("sides").includes(dirr) ||
          currTile.get("sides").includes(_dirr)
        )
          return false;

        if (this.distanceMap[nx * map.get("mapHeight") + ny].dist > newLength) {
          this.distanceMap[nx * map.get("mapHeight") + ny] = {
            dist: newLength,
            px: x,
            py: y
          };
          queue.push([nx, ny]);

          if (destTile.get("units").length == 0) {
            map.setTile({
              id: destTile.id,
              hint: destTile.get("hint") | Hints.Move
            });
          }
        }
      });
    }
  }

  validTarget(target, map) {
    return target.get("hint") & Hints.Move;
  }

  use(target, map) {
    const unit = this.unit;
    const animeWapper = {
      get x() {
        return unit.get("x");
      },
      get y() {
        return unit.get("y");
      },
      set x(x) {
        return unit.set({ x });
      },
      set y(y) {
        return unit.set({ y });
      }
    };

    const path = [];
    let x = target.get("x"),
      y = target.get("y");
    while (this.distanceMap[x * map.get("mapHeight") + y].dist > 0) {
      path.push({ x, y });
      ({ px: x, py: y } = this.distanceMap[x * map.get("mapHeight") + y]);
    }

    const tl = anime.timeline({
      easing: "linear",
      duration: Math.max(path.length * 20, 100)
    });
    path.reverse().forEach(({ x, y }) => {
      tl.add({
        targets: animeWapper,
        x: (x + 0.5) * map.get("tileSize"),
        y: (y + 0.5) * map.get("tileSize")
      });
    });

    tl.finished.then(() => {
      if (this.unit.has("parent")) {
        this.unit.get("parent").get("units").remove(this.unit);
      }
      target.get("units").add(this.unit);
      this.unit.set({
        parent: target,
        tileX: target.get("x"),
        tileY: target.get("y"),
        energy: 0
      });
    });

    this.cd = true;
    map.unset("activeUnit");
    return true;
  }
}
