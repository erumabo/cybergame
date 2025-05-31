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