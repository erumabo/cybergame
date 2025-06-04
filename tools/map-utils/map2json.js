#!/usr/bin/env node
import _ from "underscore";
import YAML from "yaml";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";

const parseCSV = (csv) =>
  csv
    .split("\n")
    .map((row) => row.trim())
    .filter((row) => !!row)
    .map((row) => row.split(",").map((cell) => cell.trim()));
const openJSON = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const openCSV = (file) => parseCSV(fs.readFileSync(file, "utf-8"));
const openYAML = (file) => YAML.parse(fs.readFileSync(file, "utf-8"));

function parsePropValue([title, value]) {
  const [_, type] = title.split(":");
  if (!type) return value;
  switch (type) {
    case "boolean":
      return value === "true" || value === "1";
    case "int":
      return parseInt(value);
    default:
      return value;
  }
}

function parseTile(tile, tileHeaders) {
  let [id, ...props] = tile;
  const properties = _.zip(tileHeaders, props)
    .filter(([, value]) => !!value)
    .map(([key, value]) => ({
      name: key.split(":")[0],
      type: key.split(":")[1] ?? "string",
      value: parsePropValue([key, value])
    }));
  return properties.length > 0
    ? {
        id: +id,
        properties
      }
    : undefined;
}

function parseTileset(path, tilesetdef) {
  let tileset = tilesetdef;
  let otiles = tileset.tiles ?? [];

  if (fs.existsSync(`${path}/Tilesets/${tileset.name}/config.yml`)) {
    tileset = openYAML(`${path}/Tilesets/${tileset.name}/config.yml`);
    if (tileset.tiles) otiles.push(...tileset.tiles);

    if (fs.existsSync(`${path}/Tilesets/${tileset.name}/tiles.csv`)) {
      const [[, ...tileHeaders], ...tiles] = openCSV(
        `${path}/Tilesets/${tileset.name}/tiles.csv`
      );
      otiles.push(
        ...tiles
          .map((tile) => parseTile(tile, tileHeaders))
          .filter((tile) => !!tile)
      );
    }
  }

  return {
    ...tilesetdef,
    ...tileset,
    image: `../Tilesets/${tileset.name}/tileset.png`,
    firstgid: +tilesetdef.firstgid,
    tilecount: +tileset.tilecount,
    tiles: otiles.length > 0 ? otiles : undefined
  };
}

function assembleTilemap(path, mapa) {
  console.log(`Assembling tilemap ${chalk.green(mapa)}`);
  let tilemap = openYAML(`${path}/${mapa}/base.yml`);

  console.log("");
  tilemap.tilesets = tilemap.tilesets.map((tileset) => {
    console.log(`  - Adding tileset ${chalk.green(tileset.name)}`);
    return parseTileset(path, tileset);
  });

  console.log("");
  for (let layer of tilemap.layers) {
    if (layer.type == "tilelayer") {
      console.log(`  - Adding tilelayer ${chalk.green(layer.name)}`);
      let data = openCSV(`${path}/${mapa}/${layer.name}.csv`);
      layer.data = data.flat().map((cell) => {
        for (let tileset of tilemap.tilesets) {
          let tile = tileset.tiles?.find((td) =>
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
  const fullpath = path.join(process.cwd(), key);

  const wdir = path.dirname(fullpath);
  const mapkey = path.basename(fullpath);

  const tilemap = assembleTilemap(wdir, mapkey);
  console.log(
    `Saving compiled map ${chalk.green(mapkey)} to ${chalk.blue(
      `${fullpath}/${mapkey}.json`
    )}`
  );
  fs.writeFileSync(
    `${fullpath}/${mapkey}.json`,
    JSON.stringify(tilemap, null, 1).replace(
      /("data": \[)([^\]]+)/g,
      (_, a, b) => a + b.replace(/\s+/g, "")
    ) + "\n"
  );
}

main();
