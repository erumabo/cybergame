import { enqueueActions } from "xstate";
import type { MAction } from "../statesTypeDef";

const unidadSeleccionada = {
  on: {
    selectTile: {
      actions: enqueueActions(({ event, enqueue }) => {
        enqueue.assign({
          target: event.target
        });
      }) as MAction,
      target: "targetSelected"
    },
    selectUnit: {
      actions: enqueueActions(({ context, event, enqueue }) => {
        if (context.unit == event.target) {
          enqueue.assign({
            unit: undefined
          });
          enqueue.raise({ type: "gotoIdle" });
        } else {
          enqueue.assign({
            unit: event.target
          });
        }
      }) as MAction
    },
    gotoIdle: "idle"
  }
};

export default unidadSeleccionada;
