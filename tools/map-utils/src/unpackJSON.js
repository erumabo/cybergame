import _ from "underscore";
import YAML from "yaml";
import fs from "node:fs";

const parseCSV = csv =>
  csv.split("\n").map(row => row.split(",").map(cell => cell.trim()));
const openJSON = file => JSON.parse(fs.readFileSync(file, "utf-8"));
const openCSV = file => parseCSV(fs.readFileSync(file, "utf-8"));
const openYAML = file => YAML.parse(fs.readFileSync(file, "utf-8"));

function packLayerTiles(data, width) {
  return _.chunk(data, width)
    .map(row => row.join())
    .join("\n");
}

function packTiles(tiles) {
  let headers = [
    ...tiles.reduce(
      (headers, tile) => {
        for (let property of tile.properties) {
          headers.add(property.name);
        }
        return headers;
      },
      new Set(["id"])
    )
  ];

  let rows = tiles
    .map(tile => ({
      id: tile.id,
      ...tile.properties.reduce(
        (obj, prop) => ({
          ...obj,
          [prop.name]: prop.value
        }),
        {}
      )
    }))
    .map(tile => headers.map(header => tile[header] ?? "").join());
  return [headers.join(), ...rows].join("\n");
}

function main() {
  const [, , key] = process.argv;
  const tilemap = openJSON(`./${key}/${key}.json`);
  /*const tileTypes = {
    ...tilemap.tilesets.find(tileset => tileset.name == "TileTypes")
  };*/

  tilemap.layers.forEach(layer => {
    fs.writeFileSync(
      `./${key}/${layer.name}.csv`,
      packLayerTiles(
        layer.data.map(tile => {
          for (let tileset of tilemap.tilesets) {
            if (
              tile >= tileset.firstgid &&
              tile < tileset.firstgid + tileset.tilecount
            ) {
              let model = tileset.tiles[tile - tileset.firstgid];
              if (model) {
                return model.properties.find(prop => prop.name == "alias")
                  .value;
              } else {
                return tile;
              }
            }
          }
          return tile;
        }),
        +layer.width
      )
    );
    layer.data = undefined;
  });

  tilemap.tilesets.forEach(tileset => {
    fs.writeFileSync(
      `./Tilesets/${tileset.name}/tiles.csv`,
      packTiles(tileset.tiles)
    );
    tileset.tiles = undefined;
    tileset.image = undefined;
    fs.writeFileSync(
      `./Tilesets/${tileset.name}/config.yml`,
      YAML.stringify(tileset)
    );
  });
  tilemap.tilesets = tilemap.tilesets.map(tileset => ({ name: tileset.name }));

  fs.writeFileSync(`./${key}/base.yml`, YAML.stringify(tilemap));
}

main();
