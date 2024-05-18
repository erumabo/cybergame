/***
 * Tiles Stuff
 */

const TileTypes = {
  Wall: 0,
  StoneGround: 1,
  Water: 2,
  Obstacle: 3,
  Plains: 1,
  Ground: 1
};

const TileTypeConfig = Object.keys(TileTypes).map(_ => ({
  defBonus: 0,
  atkBonus: 0
}));

const Hints = {
  Move: 0b0010
};

/***
 * Units Stuff
 */

const UnitTypes = {
  Heavy: 0,
  Light: 1,
  Archer: 2,
  Knight: 3
};

const UnitConfig = Object.keys(UnitTypes).map(_ => ({
  hp: 10,
  atk: 1,
  def: 1,
  power: 5
}));

UnitConfig[UnitTypes.Heavy] = {
  ...UnitConfig[UnitTypes.Heavy]
};

/***
 * Tile and Unit Relation
 */

const TileCosts = Object.keys(TileTypes).map(_ =>
  Object.keys(UnitTypes).map(_ => 0xffffff)
);

TileCosts[TileTypes.Wall][UnitTypes.Fly] = 1;

TileCosts[TileTypes.Ground][UnitTypes.Heavy] = 2;
TileCosts[TileTypes.Ground][UnitTypes.Light] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Archer] = 1;
TileCosts[TileTypes.Ground][UnitTypes.Knight] = 1;

export { TileTypes, UnitTypes, TileTypeConfig, UnitConfig, TileCosts, Hints };
