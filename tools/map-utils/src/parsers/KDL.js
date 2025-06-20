import * as KDL from "kdljs";
import Parser from "./BaseParser.js";
import * as Tiled from "@mabo/tiled";

// KDL should conform to the TMX XML specification
// it can be a superset tho
class KDLParser extends Parser {
  static ParseObjectTemplate(source) {
    let template = KDLParser.#CommonParseObject(source).output;

    let tileset = KDL.query(template, "template >> tileset");
    if (tileset.length > 0)
      tileset = Tiled.Tileset.fromJSON(tileset[0].properties);
    else tileset = undefined;

    let tileobject = KDL.query(template, "template >> object");
    tileobject = KDLParser.#ParseObject(tileobject);

    return { tileset, tileobject };
  }

  static ParseTileset(sourcefile) {
    let source = KDLParser.#CommonParseObject(sourcefile).output[0]; // one tileset node per document

    let tileset = Tiled.Tileset.fromJSON(source.properties);
    if (!tileset.tiles) tileset.tiles = [];

    for (let node of source.children) {
      switch (node.name) {
        case "image":
          tileset.image = node.properties.source;
          tileset.imagewidth = node.properties.width;
          tileset.imageheight = node.properties.height;
          break;
        case "tile":
          tileset.tiles.push(KDLParser.#ParseTile(node));
          break;
        default:
          console.warn("KDL parser not implemented for node tileset." + node.name);
          break;
      }
    }

    return tileset;
  }

  static ParseMap(sourcefile) {
    let source = KDLParser.#CommonParseObject(sourcefile).output[0]; // only one map per file

    let tilemap = Tiled.TiledMap.fromJSON(source.properties);
    for (let child of source.children) {
      switch (child.name) {
        case "tileset":
          tilemap.tilesets.push(KDLParser.ParseTileset({ output: [child] }));
          break;
        case "layer":
          tilemap.layers.push(KDLParser.#ParseLayer(child));
          break;
        case "objectgroup":
          tilemap.layers.push(KDLParser.#ParseObjectGroup(child));
          break;
        default:
          console.warn(`Unknown node map.${child.name}`);
      }
    }

    return tilemap;
  }

  static #CommonParseObject(source) {
    if (typeof source === "string") {
      let output = KDL.parse(source);
      if (output.errors && output.errors.length > 0)
        throw new Error(output.errors);
      return output;
    }
    return source;
  }

  static #ParseLayer(source) {
    let layer = Tiled.TileLayer.fromJSON(source.properties);

    let data = KDL.query([source], "data");
    if (data && data.length > 0) {
      data = data[0];
      layer.compression = data.properties.compression ?? layer.compression;
      layer.encoding = data.properties.encoding ?? layer.encoding;
      if (data.values.length > 0) {
        layer.data = data.values[0].split(",").map((r) => +r.trim());
      }
    }

    let properties = KDL.query([source], "properties");
    if (properties && properties.length > 0) {
      layer.properties = KDLParser.#ParseProperties(properties[0]);
    }

    return layer;
  }

  static #ParseObjectGroup(source) {
    let layer = Tiled.ObjectGroup.fromJSON(source.properties);

    let objects = KDL.query([source], "objects");
    if (objects && objects.length > 0) {
      layer.objects = objects[0].children.map((object) =>
        KDLParser.#ParseObject([object])
      );
    }

    let properties = KDL.query([source], "objectgroup > properties");
    if (properties && properties.length > 0) {
      layer.properties = KDLParser.#ParseProperties(properties[0]);
    }

    return layer;
  }

  static #ParseObject(source) {
    let tileobject;
    // Tile Object
    if (source[0].properties.gid) {
      tileobject = Tiled.TiledObjectTile.fromJSON(source[0].properties);
    }
    // Template Object
    else if (source[0].properties.template) {
      tileobject = Tiled.TiledObjectTemplate.fromJSON(source[0].properties);
    }
    // Ellipse
    else if (KDL.query(source, "ellipse").length > 0) {
      tileobject = Tiled.TiledObjectEllipse.fromJSON(source[0].properties);
    }
    // Point
    else if (KDL.query(source, "point").length > 0) {
      tileobject = Tiled.TiledObjectPoint.fromJSON(source[0].properties);
    }
    // Polyline
    else if (KDL.query(source, "polyline").length > 0) {
      tileobject = Tiled.TiledObjectPolyline.fromJSON(source[0].properties);
      let points = KDL.query(source, "polyline")[0].properties["points"];
      tileobject.polyline = points
        .split(" ")
        .map((point) => point.split(","))
        .map(([x, y]) =>
          Tiled.Point.fromJSON({
            x,
            y
          })
        );
    }
    // Polygon
    else if (KDL.query(source, "polygon").length > 0) {
      tileobject = Tiled.TiledObjectPolygon.fromJSON(source[0].properties);
      let points = KDL.query(source, "polygon")[0].properties["points"];
      tileobject.polygon = points
        .split(" ")
        .map((point) => point.split(","))
        .map(([x, y]) =>
          Tiled.Point.fromJSON({
            x,
            y
          })
        );
    }

    let properties = KDL.query(source, "properties");
    if (properties && properties.length > 0) {
      tileobject.properties = KDLParser.#ParseProperties(properties[0]);
    }

    return tileobject;
  }

  static #ParseTile(source) {
    let tile = Tiled.Tile.fromJSON(source.properties);
    for (let child of source.children) {
      switch (child.name) {
        case "properties":
          tile.properties = KDLParser.#ParseProperties(child);
          break;
        default:
          console.warn("KDL parser not implemented for node tileset.tile." + child.name);
          break;
      }
    }
    return tile;
  }

  static #ParseProperties(source) {
    let properties = [];
    for (let child of source.children) {
      switch (child.name) {
        case "property":
          properties.push(Tiled.Property.fromJSON(child.properties));
          break;
        default:
          console.warn(`Unknown child ${child.name} on properties node. Ignored`);
          break;
      }
    }
    return properties;
  }
}
export default KDLParser;
