import { UnitTypes } from "./globals.js";

const gameConfig = {
  pack: "assets/pack.json",
  units: [
    { id: "Topaz", type: UnitTypes.Knight },
    { id: "Aqua", type: UnitTypes.Archer },
    { id: "Opal", type: UnitTypes.Heavy },
    { id: "Ruby", type: UnitTypes.Archer },
    { id: "Emerald", type: UnitTypes.Heavy },
    { id: "Spinel", type: UnitTypes.Knight },
    { id: "Azure", type: UnitTypes.Knight },
    { id: "Rubellite", type: UnitTypes.Knight },
    { id: "Cinnabar", type: UnitTypes.Archer },
    { id: "Diamond", type: UnitTypes.Knight }
  ],
  mapas: [
    "Bosque"
  ]
};

export { gameConfig };
