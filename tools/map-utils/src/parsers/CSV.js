//import _ from "underscore";
import Parser from "./BaseParser.js";
import * as Tiled from "@mabo/tiled";
import path from "node:path";

// "Parser", it assumes a simple csv with no "quoted" values, everything is a string
const parseCSV = (csv) =>
  csv
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => row.split(",").map((cell) => cell.trim()));

// CSV Parser is only for single, tile layers
// might extend definition in future for tilesets or dense object groups
class CSVParser extends Parser {
  static ParseLayer(source) {
    let layerdata = source;
    if(typeof layerdata === "string") layerdata = parseCSV(layerdata);
    const width = layerdata[0]?.length ?? 0;
    const height = layerdata.length;
    let layer = new Tiled.TileLayer(0,0,0,width,height);
    layer.data = layerdata.flat();
    return layer;
  }
}
export default CSVParser;


/**
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
**/

