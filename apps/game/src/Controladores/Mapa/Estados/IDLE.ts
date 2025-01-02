import { enqueueActions } from "xstate";
import type { MAction } from "../statesTypeDef";

const idle = {
  on: {
    selectUnit: {
      actions: enqueueActions(({ enqueue, event }) => {
        enqueue.assign({
          unit: event.target
        });
      }) as MAction,
      target: "unidadSeleccionada"
    }
  }
};

export default idle;
