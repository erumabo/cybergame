import type { StateContext } from "../Estados/State";
import { PathBlockedStrategy, NoPathFoundStrategy } from "grid-engine";

export default function MoveAction({
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
