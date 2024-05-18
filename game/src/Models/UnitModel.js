import { UnitTypes, UnitConfig } from "/src/globals.js";
import Backbone from "backbone";

export class UnitModel extends Backbone.Model {
  get defaults() {
    return {
      x: 0,
      y: 0,
      tileX: 0,
      tileY: 0,
      energy: 0
    };
  }

  skills = [];

  constructor(unitDef) {
    super(unitDef);

    this.set({
      ...UnitConfig[this.get("type")]
    });
  }

  /* Lifecycle */
  update(dt) {
    this.set({
      energy: this.get("energy") + (dt / 1000) * this.get("speed")
    });
  }

  activate(map) {
    for (let skill of this.skills) {
      skill.activate.call(this, map);
    }
  }

  target(map, t) {
    for (let skill of this.skills) {
      if (skill.use.call(this, map, t)) break;
    }
  }
}

export class UnitsCollection extends Backbone.Collection {
  get model() {
    return UnitModel;
  }
}
