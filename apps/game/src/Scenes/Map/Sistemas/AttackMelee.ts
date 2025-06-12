import type { StateContext } from "../Estados/State";
import type { System } from "./System";
import type UnitSprite from "../GameObjects/UnitSprite";

import { Math as PMath } from "phaser";

const AttackMelee: System = {
  name: "atk_melee",
  displayName: "Ataque",
  icon: "swords",
  register(context: StateContext) {
    context.controller.systems.push(AttackMelee);
  },
  test(context: StateContext) {
    if (!context.activeUnit || !context.target) return false;
    const gridEngine = context.controller.scene.gridEngine;
    const unit = gridEngine.getPosition(context.activeUnit);
    if (!unit) return false;
    if (
      PMath.Distance.Chebyshev(
        context.target.x,
        context.target.y,
        unit.x,
        unit.y
      ) != 1
    )
      return false;
    const enemy = gridEngine.getCharactersAt(context.target);
    if (enemy.length == 0) return false;
    let enemySprite = gridEngine.getContainer(enemy[0])! as UnitSprite;
    return enemySprite.hp > 0 && enemySprite.getData("faction") == "enemy";
  },
  execute(context: StateContext) {
    if (!context.activeUnit || !context.target) return false;
    const gridEngine = context.controller.scene.gridEngine;
    const enemyname = gridEngine.getCharactersAt(context.target)[0]!;

    const unit = gridEngine.getContainer(context.activeUnit)! as UnitSprite;
    const enemy = gridEngine.getContainer(enemyname)! as UnitSprite;

    const ataque = unit.atk;
    const defensa = enemy.def;

    enemy.damage(ataque - defensa);

    context.controller.scene.cameras.main.shake(200,0.01);
  }
};

export default AttackMelee;
