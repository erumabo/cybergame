import { setup, enqueueActions } from "xstate";
import { TContext, TEvents } from "./statesTypeDef";

import idle from "./Estados/IDLE";
import unidadSeleccionada from "./Estados/UnidadActiva";
import targetSelected from "./Estados/TargetTileSelected";

import moveAction from "./Sistemas/MoveUnit";
import inspectAction from "./Sistemas/InspectTile";

const stateMachine = setup({
  types: {
    events: {} as TEvents,
    context: {} as TContext,
    input: {} as TContext
  },
  actions: {
    Move: enqueueActions(({ context, enqueue }) => {
      moveAction({ context });
      enqueue.raise({ type: "gotoUnidadSeleccionada" });
    }),
    Inspect: inspectAction
  }
}).createMachine({
  initial: "idle",
  context: ({ input }) => ({
    scene: input.scene,
    world: input.world
  }),
  states: {
    idle,
    unidadSeleccionada,
    targetSelected
  }
});

export default stateMachine;
