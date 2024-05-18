import { UnitTypes, TileTypes } from "./globals.js";

const gameConfig = {
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
  levels: []
};

gameConfig.levels.push({
  tileSize: 32,
  baseURL: "/assets/level01/",
  tilemap: "level01.json",
  tilesets: {
    Wall: "Texture/TX Tileset Wall.png",
    Grass: "Texture/TX Tileset Grass.png",
    StoneGround: "Texture/TX Tileset Stone Ground.png",
    Struct: "Texture/TX Struct.png",
    Units: "Texture/TX Chars.png"
  }
});

export { gameConfig };
