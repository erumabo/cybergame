#!/usr/bin/env node
import _ from "underscore";
import YAML from "yaml";
import fs from "node:fs";

const parseCSV = (csv) =>
  csv
    .split("\n")
    .map(row => row.trim())
    .filter(row => !!row)
    .map((row) => row.split(",").map((cell) => cell.trim()))
const openJSON = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const openCSV = (file) => parseCSV(fs.readFileSync(file, "utf-8"));
const openYAML = (file) => YAML.parse(fs.readFileSync(file, "utf-8"));

function parsePropValue([title, value]) {
  const [_, type] = title.split(":");
  if (!type) return value;
  switch (type) {
    case "boolean":
      return value === "true";
    case "int":
      return parseInt(value);
    default:
      return value;
  }
}

function parseTileset(tileset) {
  const [[, ...tileHeaders], ...tiles] = openCSV(
    `./Tilesets/${tileset.name}/tiles.csv`
  );
  return {
    ...tileset,
    image: `../Tilesets/${tileset.name}/tileset.png`,
    firstgid: +tileset.firstgid,
    tilecount: +tileset.tilecount,
    tiles: tiles.map((tile) => {
      let [id, ...props] = tile;
      const properties = _.zip(tileHeaders, props)
        .filter((prop) => !!prop[1])
        .map((prop) => ({
          name: prop[0].split(":")[0],
          type:
            prop[0].split(":").length > 1 ? prop[0].split(":")[1] : "string",
          value: parsePropValue(prop)
        }));
      return {
        id: +id,
        properties: properties.length > 0 ? properties : undefined
      };
    })
  };
}

function assembleTilemap(mapa) {
  //const TileDefinitions = parseTileset(openYAML("./Tilesets/TileTypes/config.yml"));

  let tilemap = openYAML(`./${mapa}/base.yml`);
  tilemap.tilesets = tilemap.tilesets.map((tileset) =>
    parseTileset(openYAML(`./Tilesets/${tileset.name}/config.yml`))
  );

  for (let layer of tilemap.layers) {
    if (layer.type == "tilelayer") {
      let data = openCSV(`./${mapa}/${layer.name}.csv`);
      layer.data = data.flat().map((cell) => {
        for (let tileset of tilemap.tilesets) {
          let tile = tileset.tiles.find((td) =>
            td.properties?.some((tp) => tp.name == "alias" && tp.value == cell)
          );
          if (tile) return tile.id + tileset.firstgid;
        }
        return +cell;
      });
    }
  }

  return tilemap;
}

function main() {
  const [, , key] = process.argv;
  const tilemap = assembleTilemap(key);
  fs.writeFileSync(
    `./${key}/${key}.json`,
    JSON.stringify(tilemap, null, 1) + "\n"
  );
}

main();
