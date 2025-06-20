import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";
import * as Tiled from "@mabo/tiled";

import JSONParser from "./parsers/JSON.js";
import YAMLParser from "./parsers/YAML.js";
import KDLParser from "./parsers/KDL.js";
import TMXParser from "./parsers/TMX.js";
import CSVParser from "./parsers/CSV.js";

function copyObject(original, clone) {
  Object.keys(original).forEach((p) => {
    clone[p] = original[p] ?? clone[p];
  });
  return clone;
}

function readFile(filename) {
  return fs.readFileSync(filename, "utf-8");
}

function getTilemap(name, fullpath, mapa) {
  console.log(`Parsing tilemap ${chalk.green(name)}`);
  let ext = path.extname(mapa);
  let filecontent = readFile(path.join(fullpath, mapa));
  switch (ext) {
    case ".yml":
    case ".yaml":
      return YAMLParser.ParseMap(filecontent);
    case ".json":
      return JSONParser.ParseMap(filecontent);
    case ".kdl":
      return KDLParser.ParseMap(filecontent);
    case ".tmx":
      return TMXParser.ParseMap(filecontent);
  }
}

function getTileset(fullpath, filename) {
  console.log(`Assembling tileset ${chalk.green(filename)}`);
  let ext = path.extname(filename);
  let filepath = path.join(fullpath, filename);
  let filecontent = readFile(filepath);
  let tileset;
  switch (ext) {
    case ".yml":
    case ".yaml":
      tileset = YAMLParser.ParseTileset(filecontent);
      break;
    case ".json":
      tileset = JSONParser.ParseTileset(filecontent);
      break;
    case ".kdl":
      tileset = KDLParser.ParseTileset(filecontent);
      break;
    case ".tmx":
      tileset = TMXParser.ParseTileset(filecontent);
      break;
  }
  filepath = path.dirname(filepath);
  tileset.image = path.relative("", path.join(filepath, tileset.image));
  return tileset;
}

function processTileLayer(fullpath, layer, tilemap) {
  if (layer.encoding === "csv" && (!layer.data || layer.data.length == 0)) {
    console.log(`  - Adding tilelayer ${chalk.green(layer.name + ".csv")}`);
    const layerdatapath = path.join(
      fullpath,
      "Layers",
      `base_${layer.name}.csv`
    );
    if (!fs.existsSync(layerdatapath)) throw new Error("No layer data found for " +layer.name + ".csv");

    let csvLayer = CSVParser.ParseLayer(readFile(layerdatapath));
    layer.width = csvLayer.width;
    layer.height = csvLayer.height;
    layer.data = csvLayer.data.map((cell) => {
      for (let tileset of tilemap.tilesets) {
        let tile = tileset.tiles?.find((td) =>
          td.properties?.some((tp) => tp.name === "name" && tp.value === cell)
        );
        if (tile) return tile.id + tileset.firstgid;
      }
      return +cell;
    });
  }
}

function processObjectGroup(fullpath, layer, tilemap) {
  layer.objects = layer.objects.map((object) => {
    if (object.template) {
      console.log(
        `  - Adding object from template ${chalk.green(object.template)}`
      );
      let template = readFile(path.join(fullpath, object.template));
      let ext = path.extname(object.template);
      switch (ext) {
        case ".yml":
        case ".yaml":
          template = YAMLParser.ParseObjectTemplate(template);
          break;
        case ".json":
          template = JSONParser.ParseObjectTemplate(template);
          break;
        case ".kdl":
          template = KDLParser.ParseObjectTemplate(template);
          break;
        case ".tmx":
          template = TMXParser.ParseObjectTemplate(template);
          break;
      }

      let { tileobject, tileset } = template;
      if (tileobject.gid && !tileset)
        throw new Error(
          `Tile Object ${tileobject.name}, but no Tilset specified, at ${object.template}`
        );

      tileobject = copyObject(
        { ...object, template: undefined, properties: undefined },
        tileobject
      );
      tileobject.properties = tileobject.properties.reduce(
        (properties, property) => {
          if (!properties.some((prop) => prop.name === property.name)) {
            properties.push(property);
          }
          return properties;
        },
        object.properties ?? []
      );

      if (tileobject.gid && tileset) {
        if (tileset.name) {
          let tset = tilemap.tilesets.find(
            (tset) => tset.name === tileset.name
          );
          // -1 so gid 1 matches firstgid
          if (tset) tileobject.gid += tset.firstgid - 1;
        } else {
          // not embebed tileset, will not embed object
          return object;
        }
      }
      return tileobject;
    }
    return object;
  });
}

function assembleTilemap(name, fullpath, mapa) {
  let ext = path.extname(mapa);

  //Load main tile map file
  let tilemap = getTilemap(name, fullpath, mapa);

  console.log("");
  // Process and embed external tileset files
  tilemap.tilesets = tilemap.tilesets.map((tileset) => ({
    ...tileset,
    ...(tileset.source ? getTileset(fullpath, tileset.source) : {}),
    firstgid: tileset.firstgid
  }));

  console.log("");
  // Load external object from templates
  // and tile layers from csvs
  for (let layer of tilemap.layers) {
    switch (layer.type) {
      case "tilelayer":
        processTileLayer(fullpath, layer, tilemap);
        break;
      case "objectgroup":
        processObjectGroup(fullpath, layer, tilemap);
        break;
    }
  }

  return tilemap;
}

export default function ParseTilemap(name, input) {
  if(!input) return new Tiled.TiledMap();
  const fullpath = path.join(process.cwd(), input);
  
  const wdir = path.dirname(fullpath);
  const mapkey = path.basename(fullpath);

  const tilemap = assembleTilemap(name, wdir, mapkey);
  return tilemap;
}
