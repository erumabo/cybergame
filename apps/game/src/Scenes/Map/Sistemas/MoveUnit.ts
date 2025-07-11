import type { EventPayload } from "../Estados/State";
import type { System } from "./System";
import {
  PathBlockedStrategy,
  NoPathFoundStrategy,
  LayerPosition,
  GridEngine
} from "grid-engine";

export function FindPath(
  char: string,
  unit: LayerPosition,
  target: LayerPosition,
  gridEngine: GridEngine
) {
  return gridEngine.findShortestPath(unit, target, {
    shortestPathAlgorithm: "A_STAR",
    considerCosts: true,
    collisionGroups: gridEngine.getCollisionGroups(char)
  });
}

export function MoveUnit({ scene, context }: EventPayload) {
  const tile = context.target,
    unit = context.activeUnit;
  if (!tile || !unit) return;
  scene.gridEngine.stopMovement(unit);
  scene.gridEngine.moveTo(unit, tile, {
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
  icon: "footprints",
  register(controller) {
    controller.systems.push(MoveAction);
  },
  test({ context, scene }: EventPayload) {
    if (!context.activeUnit || !context.target) return false;

    const gridEngine = scene.gridEngine;
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
    const path = FindPath(context.activeUnit, unit, target, gridEngine);
    if (!path || path.path.length == 0) return false;
    return true;
  },
  execute(payload: EventPayload) {
    MoveUnit(payload);
  }
};
export default MoveAction;
