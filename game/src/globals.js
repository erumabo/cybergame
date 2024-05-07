/***
 * Tiles Stuff
 */

const TileTypes = {
  Wall: 0,
  Plain: 1,
  Water: 2,
  Void: 3,
  Fire: 4,
  Forest: 5
};

const TileTypeConfig = Object.keys(TileTypes).map(_ => ({
  icon: "",
  color: 0x000000,
  border: 0xffffff,
  defBonus: "",
  atkBonus: ""
}));

TileTypeConfig[TileTypes.Wall] = {
  icon: "",
  color: 0xff0f0f,
  border: 0xffffff,
  defBonus: "",
  atkBonus: ""
};

TileTypeConfig[TileTypes.Plain] = {
  icon: "",
  color: 0xf0fff0,
  border: 0x000000,
  defBonus: "",
  atkBonus: ""
};

TileTypeConfig[TileTypes.Forest] = {
  icon: "",
  color: 0x0ff00f,
  border: 0x000000,
  defBonus: "",
  atkBonus: ""
};

TileTypeConfig[TileTypes.Water] = {
  icon: "",
  color: 0x0ff0ff,
  border: 0x000000,
  defBonus: "",
  atkBonus: ""
};

const Hints = {
  Move: 0b0010
};

/***
 * Units Stuff
 */

const UnitTypes = {
  Heavy: 0,
  Light: 1,
  Fly: 2,
  Archer: 3,
  Knight: 4
};

const UnitConfig = Object.keys(TileTypes).map(_ => ({
  power: 3,
  hp: 10,
  atk: 1,
  def: 1
}));

/***
 * Tile and Unit Relation
 */

const TileCosts = Object.keys(TileTypes).map(_ =>
  Object.keys(UnitTypes).map(_ => 0xffffff)
);

TileCosts[TileTypes.Wall][UnitTypes.Fly] = 1;

TileCosts[TileTypes.Plain][UnitTypes.Heavy] = 2;
TileCosts[TileTypes.Plain][UnitTypes.Light] = 1;
TileCosts[TileTypes.Plain][UnitTypes.Fly] = 1;
TileCosts[TileTypes.Plain][UnitTypes.Archer] = 1;

TileCosts[TileTypes.Water][UnitTypes.Fly] = 1;

export { TileTypes, UnitTypes, TileTypeConfig, UnitConfig, TileCosts, Hints };
