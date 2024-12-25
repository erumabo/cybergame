/***
 * Tiles Stuff
 */

export const Hints = {
  Move: 0b0010,
  Attack: 0b0001
};

/***
 * Units Stuff
 */
export const UnitTypes = {
  Heavy: 0,
  Light: 1,
  Archer: 2,
  Knight: 3
};

export const UnitConfig = Object.keys(UnitTypes).map(_ => ({
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

/***
 * Systems and Components
 */
export const Components = {
  UnitStats: "UnitStats",
  UnitSprite: "UnitSprite",
  DOMElement: "DOMElement",
  Interactivo: "Interactivo",
  Moviendo: "Moviendo",
  Atacando: "Atacando"
};
