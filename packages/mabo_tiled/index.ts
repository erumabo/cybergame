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

export class Point {
  constructor(
    public x: number,
    public y: number
  ) {}
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
}
export class ObjectTemplate {}
export class WangTile {}
export class WangColor {}
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
}
export class Frame {
  constructor(
    public duration: number,
    public tileid: number
  ) {}
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
  objectgroup?: Layer;
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
}
export class Transformations {
  constructor(
    public hflip: boolean = false,
    public vflip: boolean = false,
    public rotate: boolean = false,
    public preferuntransformed: boolean = true
  ) {}
}
export class TileOffset {
  constructor(
    public x: number,
    public y: number
  ) {}
}
export class Grid {
  constructor(
    public height: number,
    public width: number,
    public orientation: Orientation = "orthogonal"
  ) {}
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
}
export class TiledObjectPolygon extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, width, height, name);
    this.polygon = [];
  }
}
export class TiledObjectPolyline extends BaseTiledObject {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name?: string
  ) {
    super(id, x, y, width, height, name);
    this.polyline = [];
  }
}
export type TiledObject =
  | TiledObjectEllipse
  | TiledObjectTile
  | TiledObjectPoint
  | TiledObjectPolygon
  | TiledObjectPolyline;

export class Chunk {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public data: string | number[]
  ) {}
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

  /***
   * To JSON string, alias for toString
   */
  toJSON = () => this.toString();
  async toString() {
    return "{}";
  }

  addLayer() {}
  replaceLayer() {}
  getLayer() {}

  getLayerNames() {}
}
