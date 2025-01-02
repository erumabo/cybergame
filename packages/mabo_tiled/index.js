import _ from "underscore";

let YAML;
import("yaml")
  .then((Y) => (YAML = Y))
  .catch((_) => (YAML = false));

class Tileset {}

class TileLayer {}
class ObjectLayer {}

class Tiled {
  #tiled;
  #tilesets = [];
  #layers = [];
  #width = 0;
  #height = 0;
  #tilewidth = 32;
  #tileheight = 32;
  #nextobjectid = 1;
  #orientation = "orthogonal";

  constructor() {}

  /***
   * Init from a JSON tiled object
   */
  static fromTiled(tmx) {
    const tiled = new this();
    return tiled;
  }

  /***
   * Init from a JSON string
   */
  static fromJSON(tmj) {
    const tiled = new this();
    return tiled;
  }

  /***
   * Init from a YAML string
   */
  static fromYAML(tmy) {
    if (!YAML) throw new Error("YAML was not found");
    const tiled = new this();
    return tiled;
  }

  /***
   * To Tiled JSON object
   */
  toTiled() {}

  /***
   * To JSON string, alias for toString
   */
  toJSON = () => this.toString();
  async toString() {
    if (YAML === undefined) {
      try {
        YAML = await import("yaml");
      } catch (err) {
        YAML = false;
      }
    }
    return "Hello World";
  }

  /***
   * To YAML string
   */
  toYAML() {
    if (!YAML) throw new Error("YAML was not found");
  }

  addLayer() {}
  replaceLayer() {}
  getLayer() {}

  getLayerNames() {}
}

export { Tiled };
