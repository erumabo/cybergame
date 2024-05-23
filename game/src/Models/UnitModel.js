import { UnitTypes, UnitConfig } from "/src/globals.js";
import Backbone from "backbone";

export class UnitModel extends Backbone.Model {
  /** Backbone props **/
  get defaults() {
    return {
      x: 0,
      y: 0,
      tileX: 0,
      tileY: 0,
      energy: 0,
      power: 1,
      speed: 1,
      hp: 10,
      maxhp: 10,
      attack: 1
    };
  }

  /** Buissness logic props **/
  /** consider making a proxy for this **/
  skills = [];

  constructor(unitDef) {
    super(unitDef);

    this.set({
      ...UnitConfig[this.get("type")]
    });
    
    this.on("change:energy", () =>{
      this.skills.forEach(s => s.cd = false);
    })
  }

  /* Lifecycle */
  update(dt) {
    this.set({
      energy: Math.min(
        this.get("energy") + (dt / 1000.0) * this.get("speed"),
        100
      )
    });
  }

  activate(map) {
    for (let skill of this.skills) {
      skill.activate(map);
    }
  }

  /*
  target(map, t) {
    for (let skill of this.skills) {
      if (skill.use(t, map)) break;
    }
  }*/
}

export class UnitsCollection extends Backbone.Collection {
  get model() {
    return UnitModel;
  }
}
