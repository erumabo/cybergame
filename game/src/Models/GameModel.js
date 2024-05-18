import { UnitModel, UnitsCollection } from "./UnitModel.js";
import { MapModel, MapsCollection } from "./MapModel.js";
import Skills from "./Skills.js";
import Backbone from "backbone";

export default class GameModel extends Backbone.Model {
  units = new UnitsCollection();
  levels = new MapsCollection();

  constructor(gameConfig) {
    super(gameConfig);
    gameConfig.units.forEach(u => {
      let unit = new UnitModel(u);
      unit.skills.push(new Skills.Move());
      this.units.add(unit);
    });
    this.levels.add(
      gameConfig.levels.map(
        (level, i) => new MapModel(this, { ...level, id: i })
      )
    );
  }
}
