import type { StateContext } from "../Estados/State";
import type { System } from "./System";

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

    const unit = context.controller.scene.gridEngine.getPosition(
      context.activeUnit
    );
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
    return true;
  },
  execute(_: StateContext) {}
};

export default AttackMelee;
