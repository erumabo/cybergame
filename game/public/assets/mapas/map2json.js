import _ from "underscore";
import YAML from "yaml";
import fs from "node:fs";

const parseCSV= csv => csv.split("\n").map(row => row.split(",").map(cell => cell.trim()));
const openJSON = file => JSON.parse(fs.readFileSync(file, "utf-8"));
const openCSV = file => parseCSV(fs.readFileSync(file, "utf-8"));
const openYAML = file => YAML.parse(fs.readFileSync(file, "utf-8"));

function parseTileset(tileset) {
  const [[, ...tileHeaders], ...tiles] = openCSV(`./Tilesets/${tileset.name}/tiles.csv`);
  return {
    ...tileset,
    image: `../Tilesets/${tileset.name}/tileset.png`,
    firstgid: +tileset.firstgid,
    tiles: tiles.map(tile => {
      let [id, ...props] = tile;
      return {
        id: +id,
        properties: _.zip(tileHeaders, props).map(prop => ({
          name: prop[0],
          type: "string",
          value: prop[1]
        }))
      };
    })
  };
}


function assembleTilemap(mapa) {
  const TileDefinitions = parseTileset(openYAML("./Tilesets/TileTypes/config.yml"));

  let tilemap = openYAML(`./${mapa}/base.yml`);
  for (let layer of tilemap.layers) {
    let data = openCSV(`./${mapa}/${layer.name}.csv`);
    layer.data = data
      .flat()
      .map(
        cell =>
          TileDefinitions.tiles.find(td =>
            td.properties.some(tp => tp.name == "alias" && tp.value == cell)
          ).id + TileDefinitions.firstgid
      );
  }

  tilemap.tilesets = tilemap.tilesets.map(tileset => ({
    ...parseTileset(openYAML(`./Tilesets/${tileset.name}/config.yml`))
  }));

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
