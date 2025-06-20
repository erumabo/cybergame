import Parser from "./BaseParser.js";
import * as Tiled from "@mabo/tiled";

// A Parser for the TMX XML specification
// Not a priority, KDL is more human friendly
class TMXParser extends Parser {
  static ParseTileset(filepath, source) {
    throw new Error("XML parser not implemented");
  }

  static ParseMap(map) {
    throw new Error("XML parser not implemented");
  }
}
export default TMXParser;
