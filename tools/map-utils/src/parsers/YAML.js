import Parser from "./BaseParser.js";
import YAML from "yaml";
import * as Tiled from "@mabo/tiled";

// This is basically a copy of the JSON parser, and should the same
// as YAML and JSON are functionally the same, and implement the same specification
// Even so, Ill keep the duplicate code here if we want to diverge yaml from json standard
class YAMLParser extends Parser {
  static ParseObjectTemplate(source) {
    let template = YAMLParser.#CommonParseObject(source);

    let tileset = template.tileset
      ? Tiled.Tileset.fromJSON(template.tileset)
      : undefined;
    let object = template.object;
    if (object.ellipse) object = Tiled.TiledObjectEllipse.fromJSON(object);
    else if (object.gid) object = Tiled.TiledObjectTile.fromJSON(object);
    else if (object.point) object = Tiled.TiledObjectPoint.fromJSON(object);
    else if (object.polygon) object = Tiled.TiledObjectPolygon.fromJSON(object);
    else if (object.polyline)
      object = Tiled.TiledObjectPolyline.fromJSON(object);
    else throw new Error("invalid object");

    return { tileset, tileobject: object };
  }

  static ParseTileset(source) {
    let tileset = YAMLParser.#CommonParseObject(source);
    tileset = Tiled.Tileset.fromJSON(tileset);

    return {
      ...tileset,
      tiles: tileset.tiles ?? []
    };
  }

  static ParseMap(source) {
    let tilemap = YAMLParser.#CommonParseObject(source);
    tilemap = Tiled.TiledMap.fromJSON(tilemap);
    return tilemap;
  }

  static #CommonParseObject(source) {
    if (typeof source === "string") return YAML.parse(source);
    return source;
  }
}
export default YAMLParser;
