import Parser from "./BaseParser.js";
import * as Tiled from "@mabo/tiled";

// Plain old json tiled document
class JSONParser extends Parser {
  static ParseObjectTemplate(source) {
    let template = JSONParser.#CommonParseObject(source);

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
    let tileset = Tiled.Tileset.fromJSON(JSONParser.#CommonParseObject(source));

    return {
      ...tileset,
      tiles: tileset.tiles ?? []
    };
  }

  static ParseMap(source) {
    return Tiled.TiledMap.fromJSON(JSONParser.#CommonParseObject(source));
  }

  static #CommonParseObject(source) {
    if (typeof source === "string") return JSON.parse(source);
    return source;
  }
}
export default JSONParser;
