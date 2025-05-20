export const COLORS: Record<string, number> = {};

{
  const style = getComputedStyle(document.documentElement, null);
  for (let color of ["blue", "brown", "green"]) {
    for (let shade of [10, 20, 30, 40, 50, 60]) {
      const cssvar = "--" + color + "-" + shade;
      const value = style.getPropertyValue(cssvar);
      if (value) COLORS[cssvar] = +value.replace("#", "0x");
    }
  }
  const value = style.getPropertyValue("--white");
  if (value) COLORS["--white"] = +value.replace("#", "0x");
}

/***
 * Tiles Stuff
 */

export const Hints = {
  Move: 0b10,
  Attack: 0b01
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

export const UnitConfig: Record<string, number>[] = Object.keys(UnitTypes).map(
  (_) => ({
    hp: 10,
    atk: 1,
    def: 1,
    power: 5
  })
);

UnitConfig[UnitTypes.Heavy] = {
  ...UnitConfig[UnitTypes.Heavy]
};

/***
 * Tile and Unit Relation
 */

/***
 * Systems and Components
 *
 */
export const Components = {
  UnitStats: "UnitStats",
  UnitSprite: "UnitSprite",
  DOMElement: "DOMElement",
  Interactivo: "Interactivo",
  Moviendo: "Moviendo",
  Atacando: "Atacando"
};

const ARROWS_BASE = 1225;
export const enum ARROWS {
  UP = ARROWS_BASE + 65,
  DOWN = ARROWS_BASE + 1,
  LEFT = ARROWS_BASE + 34,
  RIGHT = ARROWS_BASE + 32,
  LR = ARROWS_BASE + 67,
  UD = ARROWS_BASE + 68,
  UL = ARROWS_BASE + 66,
  UR = ARROWS_BASE + 64,
  DL = ARROWS_BASE + 2,
  DR = ARROWS_BASE + 0,
  ALL = ARROWS_BASE + 33,
  END_UP = ARROWS_BASE + 36,
  END_LEFT = ARROWS_BASE + 4,
  END_DOWN = ARROWS_BASE + 3,
  END_RIGHT = ARROWS_BASE + 35
}
