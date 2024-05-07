import { UnitTypes, TileTypes } from "./globals.js";

function typeStr(str) {
  switch (str) {
    case "#":
      return TileTypes.Wall;
    case " ":
      return TileTypes.Plain;
    case "@":
      return TileTypes.Forest;
    case "~":
      return TileTypes.Water;
    case "X":
      return TileTypes.Void;
    default:
      return TileTypes.Plain;
  }
}

function unitStr(str) {
  switch (str) {
    case "K":
      return UnitTypes.Knight;
    case "L":
      return UnitTypes.Light;
    case "H":
      return UnitTypes.Heavy;
    case "F":
      return UnitTypes.Fly;
    case "A":
      return UnitTypes.Archer;
    default:
      return null;
  }
}

const level = {
  bg: "/assets/level01/bg.png",
  tileSize: 20,
  mapTiles: [
    "@@@ @@ @@@ @@@@@ @@@ @ @ @@@",
    "  @@@@ @ @@ @@@  @@  @  @@ @",
    " @  @@  @@@  @ @ @@@ @@  @ @",
    "  @  @@@  @ @  @@ @   @ @  @",
    "   @  @   @   @    @   @    ",
    "   @   @  @  @   @   @   @  ",
    "  @   @  @    @    @   @  @ ",
    "    @   @    @  @ @   @   @ ",
    "  @   @   @  @  @  @ @   @  ",
    "   @ @  @    @ @   @  @ @   ",
    "                            ",
    "    ######  ######  ######  ",
    "     #  #    #  #    #  #   ",
    "     #                  #   ",
    "     #  #    #  #    #  #   ",
    "    ######  ######  ######  ",
    "                            ",
    "                            ",
    "                            ",
    "                           ~",
    "                           ~",
    "                          ~~",
    "                          ~~",
    "                        ~~~~",
    "~~                    ~~~~~~",
    "~~~        ~~~    ~~ ~~~~~~~",
    "~~~~  ~~~ ~~~~~ ~~~~~~~~~~~~",
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  ],
  mapUnits: [
    "@@@ @@ @@@ @@@@@ @@@ @ @ @@@",
    "  @@@@ @ @@ @@@  @@  @  @@ @",
    " @  @@  @@@  @ @ @@@ @@  @ @",
    "  @  @@@ A@ @  @@ @   @ @  @",
    "   @  @   @   @    @ A @    ",
    "   @ A @  @  @ A @   @   @  ",
    "  @   @  @    @    @   @  @ ",
    "    @   @  A @  @ @  A@   @ ",
    "   @A @   @  @  @  @ @   @  ",
    "   @ @  @  A @ @ A @  @ @   ",
    "                            ",
    "    ######  ######  ######  ",
    "     #  #    #  #    #  #   ",
    "     # H      HH      H #   ",
    "     #  #    #  #    #  #   ",
    "    ######  ######  ######  ",
    "                            ",
    "           K   K            ",
    "       K           K        ",
    "                           ~",
    "         K   K   k         ~",
    "                          ~~",
    "                          ~~",
    "                        ~~~~",
    "~~   F   F   F   F    ~~~~~~",
    "~~~        ~~~    ~~ ~~~~~~~",
    "~~~~  ~~~ ~~~~~ ~~~~~~~~~~~~",
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  ]
};

level.map = level.mapTiles.map((row, i) =>
  row.split("").map((col, j) => ({
    type: typeStr(col),
    units: [unitStr(level.mapUnits[i][j])]
  }))
);

export { level };
