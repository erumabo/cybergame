import type { StateContext } from "../Estados/State";
import type { System } from "./System";
import {
  PathBlockedStrategy,
  NoPathFoundStrategy,
  LayerPosition,
  GridEngine
} from "grid-engine";

export function FindPath(
  unit: LayerPosition,
  target: LayerPosition,
  gridEngine: GridEngine
) {
  return gridEngine.findShortestPath(unit, target, {
    shortestPathAlgorithm: "A_STAR",
    considerCosts: true,
    //collisionGroups: gridEngine.getCollisionGroups(context.activeUnit)
  });
}

export function MoveUnit({
  controller,
  target: tile,
  activeUnit: unit
}: StateContext) {
  if (!tile || !unit) return;
  controller.scene.gridEngine.stopMovement(unit);
  controller.scene.gridEngine.moveTo(unit, tile, {
    algorithm: "A_STAR",
    considerCosts: true,
    noPathFoundStrategy: NoPathFoundStrategy.STOP,
    pathBlockedStrategy: PathBlockedStrategy.WAIT,
    pathBlockedWaitTimeoutMs: 2000
  });
}

const MoveAction: System = {
  name: "move",
  displayName: "Moverse",
  register({ controller }: StateContext) {
    controller.systems.push(MoveAction);
  },
  test(context: StateContext) {
    if(!context.activeUnit || !context.target) return false;
    
    const gridEngine = context.controller.scene.gridEngine;
    const unit = {
      position: gridEngine.getPosition(context.activeUnit),
      charLayer: gridEngine.getCharLayer(context.activeUnit)
    };
    const target = {
      ...unit,
      position: {
        x: context.target.x,
        y: context.target.y
      }
    };
    const path = FindPath(unit, target, gridEngine);
    if (!path || path.path.length == 0) return false;
    return true;
  },
  execute(context: StateContext) {
    MoveUnit(context);
  }
};
export default MoveAction;
