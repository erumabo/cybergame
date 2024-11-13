import { UnitsCollection } from "./UnitModel.js";
import Backbone from "backbone";

export class TileModel extends Backbone.Model {
  get defaults() {
    return {
      x: 0,
      y: 0,
      id: 0,
      units: new UnitsCollection(),
      hint: 0,
      effects: []
    };
  }

  constructor(attrs) {
    super(attrs);
  }
}

export class TilesCollection extends Backbone.Collection {
  get model() {
    return TileModel;
  }
}
