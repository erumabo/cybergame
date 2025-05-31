import type { StateHandler, StateContext } from "./State";
import { PathBlockedStrategy, NoPathFoundStrategy } from "grid-engine";

const stateHandler: StateHandler = {
  onPointerUp: (_, __) => {},
  onPointerDown: (event, context) => {
    if (!event.target) return;

    const gridEngine = context.controller.scene.gridEngine;

    let targets = gridEngine.getCharactersAt(event.target);
    if (targets.length == 0) return;

    context.activeUnit = targets[0];
    gridEngine.stopMovement(context.activeUnit);
    gridEngine.moveTo(context.activeUnit, event.target, {
      algorithm: "A_STAR",
      considerCosts: true,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      pathBlockedStrategy: PathBlockedStrategy.WAIT,
      pathBlockedWaitTimeoutMs: 2000
    });

    context.controller.actor.send("selectUnit", context);
  },
  onPointerMove: ({ pointer }, { controller }) => {
    if (!pointer.isDown) return;
    const camera = controller.scene.cameras.main;
    camera.scrollX -= pointer.x - pointer.prevPosition.x;
    camera.scrollY -= pointer.y - pointer.prevPosition.y;
  }
};

const idle = {
  entry: (context: StateContext) => {
    context.controller.state = stateHandler;
    context.activeUnit = "";
    context.target = {x:-1, y:-1} as any;
  },
  on: {
    selectUnit: {
      target: "unidadSeleccionada"
    }
  }
};

export default idle;
