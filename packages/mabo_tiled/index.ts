export type PropertyType =
  | "string"
  | "int"
  | "float"
  | "bool"
  | "color"
  | "file"
  | "object"
  | "class";
export type WangSetType = "corner" | "edge" | "mixed";
export type Orientation = "orthogonal" | "isometric";
export type FillMode = "stretch" | "preserve-aspect-fit";
export type HorizontalAlign = "center" | "right" | "justify" | "left";
export type VerticalAlign = "center" | "bottom" | "top";
export type LayerType = "tilelayer" | "objectgroup" | "imagelayer" | "group";
export type ObjectAlignment =
  | "unspecified"
  | "topleft"
  | "top"
  | "topright"
  | "left"
  | "center"
  | "right"
  | "bottomleft"
  | "bottom"
  | "bottomright";

function copyObject<C extends Object>(original: Partial<C>, clone: C): C {
  Object.keys(original).forEach((p) => {
    if (p in clone)
      clone[p as keyof C] = original[p as keyof C] ?? clone[p as keyof C];
  });
  return clone;
}

export class Point {
  constructor(
    public x: number,
    public y: number
  ) {}
  static fromJSON(json: Partial<Point>) {
    return copyObject(json, new this(0, 0));
  }
}
export class Property {
  name: string;
  /**
   * @default "string"
   */
  type: PropertyType;
  propertytype?: string;
  value: any;

  constructor(name: string, value: any, type: PropertyType = "string") {
    this.name = name;
    this.value = value;
    this.type = type;
  }
  static fromJSON(json: Partial<Property>) {
    return copyObject(json, new this("", null));
  }
}
export class WangTile {
  constructor(
    public tileid: number,
    public wangid: number[]
  ) {}
  static fromJSON(json: Partial<WangTile>) {
    return copyObject(json, new this(0, []));
  }
}
export class WangColor {
  className?: string;
  color: string;
  name: string;
  probability: number;
  properties: Property[];
  tile: number;
  constructor(color: string, name: string, probability: number, tile: number) {
    this.color = color;
    this.name = name;
    this.probability = probability;
    this.properties = [];
    this.tile = tile;
  }
  static fromJSON(json: Partial<WangColor>) {
    const instance = copyObject(json, new this("", "", 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class WangSet {
  className?: string;
  colors: WangColor[];
  name: string;
  properties: Property[];
  tile: number;
  type: WangSetType;
  wangtiles: WangTile[];

  constructor(name: string, tile: number, type: WangSetType = "corner") {
    this.colors = [];
    this.name = name;
    this.properties = [];
    this.tile = tile;
    this.type = type;
    this.wangtiles = [];
  }
  static fromJSON(json: Partial<WangSet>) {
    const instance = copyObject(json, new this("", 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.wangtiles) {
      instance.wangtiles = instance.wangtiles.map((wangtile) =>
        WangTile.fromJSON(wangtile)
      );
    }
    if (instance.colors) {
      instance.colors = instance.colors.map((color) =>
        WangColor.fromJSON(color)
      );
    }
    return instance;
  }
}
export class Terrain {
  name: string;
  properties: Property[];
  tile: number;
  constructor(name: string, tile: number) {
    this.name = name;
    this.properties = [];
    this.tile = tile;
  }
  static fromJSON(json: Partial<Terrain>) {
    const instance = copyObject(json, new this("", 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class Frame {
  constructor(
    public duration: number,
    public tileid: number
  ) {}
  static fromJSON(json: Partial<Frame>) {
    return copyObject(json, new this(0, 0));
  }
}
export class Tile {
  animation: Frame[];
  id: number;
  image?: string;
  imageheight: number;
  imagewidth: number;
  /**
   * @default 0
   */
  x: number;
  /**
   * @default 0
   */
  y: number;
  width: number;
  height: number;
  objectgroup?: ObjectGroup;
  probability?: number;
  properties: Property[];
  terrain?: [number, number, number, number];
  type?: string;

  constructor(
    id: number,
    imagewidth: number,
    imageheight?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    type?: string
  ) {
    this.animation = [];
    this.id = id;
    this.imagewidth = imagewidth;
    this.imageheight = imageheight ?? imagewidth;
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? this.imagewidth;
    this.height = height ?? this.imageheight;
    this.properties = [];
    this.type = type;
  }
  static fromJSON(json: Partial<Tile>) {
    const instance = copyObject(json, new this(0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.animation) {
      instance.animation = instance.animation.map((frame) =>
        Frame.fromJSON(frame)
      );
    }
    if (instance.objectgroup) {
      instance.objectgroup = ObjectGroup.fromJSON(instance.objectgroup);
    }
    return instance;
  }
}
export class Transformations {
  constructor(
    public hflip: boolean = false,
    public vflip: boolean = false,
    public rotate: boolean = false,
    public preferuntransformed: boolean = true
  ) {}
  static fromJSON(json: Partial<Transformations>) {
    return copyObject(json, new this());
  }
}
export class TileOffset {
  constructor(
    public x: number,
    public y: number
  ) {}
  static fromJSON(json: Partial<TileOffset>) {
    return copyObject(json, new this(0, 0));
  }
}
export class Grid {
  constructor(
    public height: number,
    public width: number,
    public orientation: Orientation = "orthogonal"
  ) {}
  static fromJSON(json: Partial<Grid>) {
    return copyObject(json, new this(0, 0));
  }
}
export class Tileset {
  backgroundcolor?: string;
  className?: string;
  columns: number;
  /**
   * @default "stretch"
   */
  fillmode: FillMode;
  firstgid: number;
  grid?: Grid;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  /**
   * @default "unspecified"
   */
  objectalignment: ObjectAlignment;
  properties: Property[];
  source?: string;
  spacing: number;
  terrains?: Terrain[];
  tilecount: number;
  tiledversion: string;
  tileheight: number;
  tileoffset?: TileOffset;
  /**
   * @default "tile"
   */
  tilerendersize: "tile" | "grid";
  tiles?: Tile[];
  tilewidth: number;
  transformations?: Transformations;
  transparentcolor?: string;
  type: "tileset";
  version: string;
  wangsets?: WangSet[];

  constructor(
    firstgid: number,
    image: string,
    imagewidth: number,
    imageheight: number,
    tilewidth: number,
    tileheight: number,
    margin: number = 0,
    spacing: number = 0,
    name?: string
  ) {
    let columns =
      1 + (imagewidth - margin * 2 - tilewidth) / (tilewidth + spacing);
    let rows =
      1 + (imageheight - margin * 2 - tileheight) / (tileheight + spacing);

    this.columns = columns;
    this.fillmode = "stretch";
    this.firstgid = firstgid;
    this.image = image;
    this.imageheight = imagewidth;
    this.imagewidth = imagewidth;
    this.margin = margin;
    this.name = name ?? image;
    this.objectalignment = "unspecified";
    this.properties = [];
    this.spacing = spacing;
    this.tilecount = this.columns * rows;
    this.tiledversion = "1.11.1";
    this.tileheight = tileheight;
    this.tilerendersize = "tile";
    this.tilewidth = tilewidth;
    this.type = "tileset";
    this.version = "1.11.1";
  }
  static fromJSON(json: Partial<Tileset>) {
    const instance = copyObject(json, new this(0, "", 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.terrains) {
      instance.terrains = instance.terrains.map((terrain) =>
        Terrain.fromJSON(terrain)
      );
    }
    if (instance.tiles) {
      instance.tiles = instance.tiles.map((tile) => Tile.fromJSON(tile));
    }
    if (instance.wangsets) {
      instance.wangsets = instance.wangsets.map((wangset) =>
        WangSet.fromJSON(wangset)
      );
    }
    return instance;
  }
}
export class Text {
  /**
   * @default false
   */
  bold: boolean;
  /**
   * @default "#000000"
   */
  color: string;
  /**
   * @default "sans-serif"
   */
  fontfamily: string;
  /**
   * @default "left"
   */
  halign: HorizontalAlign;
  /**
   * @default false
   */
  italic: boolean;
  /**
   * @default true
   */
  kerning: boolean;
  /**
   * @default 16
   */
  pixelsize: number;
  /**
   * @default false
   */
  strikeout: boolean;
  text: string;
  /**
   * @default false
   */
  underline: boolean;
  /**
   * @default "top"
   */
  valign: VerticalAlign;
  /**
   * @default false
   */
  wrap: boolean;
  constructor(text: string) {
    this.bold = false;
    this.color = "#000000";
    this.fontfamily = "sans-serif";
    this.halign = "left";
    this.italic = false;
    this.kerning = true;
    this.pixelsize = 16;
    this.strikeout = false;
    this.text = text;
    this.underline = false;
    this.valign = "top";
    this.wrap = false;
  }
  static fromJSON(json: Partial<Text>) {
    return copyObject(json, new this(""));
  }
}
class BaseTiledObject {
  ellipse: boolean;
  gid: number;
  height: number;
  id: number;
  name: string;
  point: boolean;
  polygon?: Point[];
  polyline?: Point[];
  properties: Property[];
  rotation: number;
  template?: string;
  text?: Text;
  type?: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    this.ellipse = false;
    this.gid = 0;
    this.height = height;
    this.id = id;
    this.name = name ?? "";
    this.point = false;
    this.properties = [];
    this.rotation = 0;
    this.visible = true;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}
export class TiledObjectEllipse extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, width, height, name);
    this.ellipse = true;
  }
  static fromJSON(json: Partial<TiledObjectEllipse>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class TiledObjectTile extends BaseTiledObject {
  constructor(
    id: number,
    gid: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, width, height, name);
    this.gid = gid;
  }
  static fromJSON(json: Partial<TiledObjectTile>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class TiledObjectPoint extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, width, height, name);
    this.point = true;
  }
  static fromJSON(json: Partial<TiledObjectPoint>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class TiledObjectPolygon extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string,
    polygon?: Point[]
  ) {
    super(id, x, y, width, height, name);
    this.polygon = polygon ?? [];
  }
  static fromJSON(json: Partial<TiledObjectPolygon>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.polygon) {
      instance.polygon = instance.polygon.map((point) => Point.fromJSON(point));
    }
    return instance;
  }
}
export class TiledObjectPolyline extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string,
    polyline?: Point[]
  ) {
    super(id, x, y, width, height, name);
    this.polyline = polyline ?? [];
  }
  static fromJSON(json: Partial<TiledObjectPolyline>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.polyline) {
      instance.polyline = instance.polyline.map((point) =>
        Point.fromJSON(point)
      );
    }
    return instance;
  }
}
export class TiledObjectTemplate implements Partial<BaseTiledObject> {
  ellipse?: boolean;
  gid?: number;
  height?: number;
  id: number;
  name?: string;
  point?: boolean;
  polygon?: Point[];
  polyline?: Point[];
  properties?: Property[];
  rotation?: number;
  template?: string;
  text?: Text;
  type?: string;
  visible?: boolean;
  width?: number;
  x?: number;
  y?: number;
  constructor(id: number, template: string, x?: number, y?:number) {
    this.id = id;
    this.template = template;
    this.x = x;
    this.y = y;
    this.properties = [];
  }
  static fromJSON(json: Partial<TiledObjectTemplate>) {
    const instance = copyObject(json, new this(0, ""));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export type TiledObject =
  | TiledObjectEllipse
  | TiledObjectTile
  | TiledObjectPoint
  | TiledObjectPolygon
  | TiledObjectPolyline
  | TiledObjectTemplate;
export class ObjectTemplate {
  /**
   * @default "template"
   */
  type: string;
  tileset?: Tileset;
  object: TiledObject;
  constructor(object: TiledObject, tileset?: Tileset) {
    this.object = object;
    this.tileset = tileset;
    this.type = "template";
  }
  static fromJSON(json: Partial<ObjectTemplate>) {
    const instance = copyObject(
      json,
      new this(new BaseTiledObject(0, 0, 0, 0, 0))
    );
    if (instance.object) {
      if (instance.object.ellipse)
        instance.object = TiledObjectEllipse.fromJSON(instance.object);
      else if (instance.object.gid)
        instance.object = TiledObjectTile.fromJSON(instance.object);
      else if (instance.object.point)
        instance.object = TiledObjectPoint.fromJSON(instance.object);
      else if (instance.object.polyline)
        instance.object = TiledObjectPolyline.fromJSON(instance.object);
      else if (instance.object.polygon)
        instance.object = TiledObjectPolygon.fromJSON(instance.object);
    }
  }
}
export class Chunk {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public data: string | number[]
  ) {}
  static fromJSON(json: Partial<Chunk>) {
    return copyObject(json, new this(0, 0, 0, 0, []));
  }
}
class BaseLayer {
  className?: string;
  id: number;
  /**
   * @default false
   */
  locked: boolean;
  name: string;
  /**
   * @default 0
   */
  offsetx: number;
  /**
   * @default 0
   */
  offsety: number;
  /**
   * @default 1
   */
  opacity: number;
  /**
   * @default 1
   */
  parallaxx: number;
  /**
   * @default 1
   */
  parallaxy: number;
  properties: Property[];
  startx: number;
  starty: number;
  tintcolor?: string;
  declare type: LayerType;
  visible: boolean;
  x: number;
  y: number;

  constructor(id: number, x: number, y: number, name?: string) {
    this.id = id;
    this.locked = false;
    this.name = name ?? "";
    this.offsetx = 0;
    this.offsety = 0;
    this.opacity = 1;
    this.parallaxx = 1;
    this.parallaxy = 1;
    this.properties = [];
    this.startx = 0;
    this.starty = 0;
    this.visible = true;
    this.x = x;
    this.y = y;
  }
}
export class TileLayer extends BaseLayer {
  chunks?: Chunk[];
  /**
   * @default ""
   */
  compression: "" | "zlib" | "gzip" | "zstd";
  data: string | number[];
  /**
   * @default "csv"
   */
  encoding: "csv" | "base64";
  height: number;
  override type: "tilelayer";
  width: number;

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, name);
    this.compression = "";
    this.data = [];
    this.encoding = "csv";
    this.height = height;
    this.type = "tilelayer";
    this.width = width;
  }
  static fromJSON(json: Partial<TileLayer>) {
    const instance = copyObject(json, new this(0, 0, 0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.chunks) {
      instance.chunks = instance.chunks.map((chunk) => Chunk.fromJSON(chunk));
    }
    return instance;
  }
}
export class ObjectGroup extends BaseLayer {
  /**
   * @default "topdown"
   */
  draworder: "topdown" | "index";
  objects: TiledObject[];
  override type: "objectgroup";
  constructor(id: number, x: number, y: number, name?: string) {
    super(id, x, y, name);
    this.draworder = "topdown";
    this.objects = [];
    this.type = "objectgroup";
  }
  static fromJSON(json: Partial<ObjectGroup>) {
    const instance = copyObject(json, new this(0, 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    if (instance.objects) {
      instance.objects = instance.objects.map((obj): TiledObject => {
        if (obj.ellipse) return TiledObjectEllipse.fromJSON(obj);
        else if (obj.gid) return TiledObjectTile.fromJSON(obj);
        else if (obj.point) return TiledObjectPoint.fromJSON(obj);
        else if (obj.polyline) return TiledObjectPolyline.fromJSON(obj);
        else if (obj.polygon) return TiledObjectPolygon.fromJSON(obj);
        else if (obj.template) return TiledObjectTemplate.fromJSON(obj);
        else throw new Error("invalid object");
      });
    }
    return instance;
  }
}
export class ImageLayer extends BaseLayer {
  image: string;
  imageheight: number;
  imagewidth: number;
  repeatx: boolean;
  repeaty: boolean;
  transparentcolor?: string;
  override type: "imagelayer";
  constructor(
    id: number,
    x: number,
    y: number,
    image: string,
    imagewidth: number,
    imageheight: number,
    name?: string
  ) {
    super(id, x, y, name);
    this.image = image;
    this.imageheight = imageheight;
    this.imagewidth = imagewidth;
    this.repeatx = false;
    this.repeaty = false;
    this.type = "imagelayer";
  }
  static fromJSON(json: Partial<ImageLayer>) {
    const instance = copyObject(json, new this(0, 0, 0, "", 0, 0));
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export class GroupLayer extends BaseLayer {
  layers: Layer[];
  override type: "group";
  constructor(
    id: number,
    x: number,
    y: number,
    name?: string,
    layers?: Layer[]
  ) {
    super(id, x, y, name);
    this.layers = layers ?? [];
    this.type = "group";
  }

  static fromJSON(json: Partial<GroupLayer>) {
    const instance = copyObject(json, new this(0, 0, 0));
    if (instance.layers) {
      instance.layers = instance.layers.map((layer) => {
        switch (layer.type) {
          case "tilelayer":
            return TileLayer.fromJSON(layer);
          case "objectgroup":
            return ObjectGroup.fromJSON(layer);
          case "imagelayer":
            return ImageLayer.fromJSON(layer);
          case "group":
            return GroupLayer.fromJSON(layer);
        }
      });
    }
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }
}
export type Layer = TileLayer | ObjectGroup | ImageLayer | GroupLayer;
export class TiledMap {
  /**
   * Background color in hex
   */
  backgroundcolor?: string;
  // class in json file
  className?: string;
  /**
   * @default -1
   */
  compressionlevel: number;
  height: number;
  hexsidelength?: number;
  /**
   * @default false
   */
  infinite: boolean;
  layers: Layer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: "orthogonal" | "isometric" | "staggered" | "hexagonal";
  /**
   * @default 0
   */
  parallaxoriginx: number;
  /**
   * @default 0
   */
  parallaxoriginy: number;
  properties: Property[];
  /**
   * @default "right-down"
   */
  renderorder: "right-down" | "right-up" | "left-down" | "left-up";
  staggeraxis?: "x" | "y";
  staggerindex?: "odd" | "even";
  tiledversion: string;
  tileheight: number;
  tilesets: Tileset[];
  tilewidth: number;
  type: "map";
  version: number | string;
  width: number;
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(
    width: number,
    height: number,
    tilewidth: number = 16,
    tileheight: number = 16
  ) {
    this.compressionlevel = -1;
    this.height = height;
    this.infinite = false;
    this.layers = [];
    this.nextlayerid = 0;
    this.nextobjectid = 0;
    this.orientation = "orthogonal";
    this.parallaxoriginx = 0;
    this.parallaxoriginy = 0;
    this.properties = [];
    this.renderorder = "right-down";
    this.tiledversion = "1.11.1";
    this.tileheight = tileheight;
    this.tilesets = [];
    this.tilewidth = tilewidth;
    this.type = "map";
    this.version = "1.11.1";
    this.width = width;
  }

  static fromJSON(json: Partial<TiledMap>) {
    const instance = copyObject(json, new this(1, 1));
    if (instance.tilesets) {
      instance.tilesets = instance.tilesets.map((tileset) =>
        Tileset.fromJSON(tileset)
      );
    }
    if (instance.layers) {
      instance.layers = instance.layers.map((layer) => {
        switch (layer.type) {
          case "tilelayer":
            return TileLayer.fromJSON(layer);
          case "objectgroup":
            return ObjectGroup.fromJSON(layer);
          case "imagelayer":
            return ImageLayer.fromJSON(layer);
          case "group":
            return GroupLayer.fromJSON(layer);
        }
      });
    }
    if (instance.properties) {
      instance.properties = instance.properties.map((property) =>
        Property.fromJSON(property)
      );
    }
    return instance;
  }

  toString() {
    return JSON.stringify(this);
  }

  addLayer(layer: Layer) {
    layer.id = this.nextlayerid++;
    this.layers.push(layer);
    return layer;
  }
  replaceLayer() {}
  getLayerByName(name: string) {
    return this.layers.find((l) => l.name == name);
  }
  getLayerById(id: number) {
    return this.layers.find((l) => l.id == id);
  }

  getLayerNames() {
    return this.layers.map((l) => l.name);
  }
}
