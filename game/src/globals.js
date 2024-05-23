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

const TileTypeConfig = Object.keys(TileTypes).map(_ => ({}));

const Hints = {
  Move: 0b0010,
  Attack: 0b0001
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


export { TileTypes, UnitTypes, TileTypeConfig, UnitConfig, Hints };
