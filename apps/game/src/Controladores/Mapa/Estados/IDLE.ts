import { enqueueActions } from "xstate";
import { MAction } from "../statesTypeDef";

const idle = {
  on: {
    selectUnit: {
      actions: enqueueActions(({ enqueue, context, event }) => {
        enqueue.assign({
          unit: event.target
        });
      }) as MAction,
      target: "unidadSeleccionada"
    }
  }
};

export default idle;
