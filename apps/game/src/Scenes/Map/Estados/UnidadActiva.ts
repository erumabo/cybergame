import type { EventPayload } from "./State";
import { MoveUnit } from "../Sistemas/MoveUnit";

const unidadSeleccionada = {
  initial: "unit_trap",
  entry(_: EventPayload) {},
  on: {
    "PointerDown.*": {
      action({ event, controller }: EventPayload) {
        controller.setTarget(event.target);
      },
      target: "targetSelected"
    },
    "PointerDrag.*": {
      action({ event, controller }: EventPayload) {
        controller.setTarget(event.target);
      },
      target: "targetSelected"
    }
  },

  states: {
    unit_trap: {
      on: {
        "PointerDown.Ally": {
          action({ event, context, controller }: EventPayload) {
            MoveUnit({
              ...arguments[0],
              context: {
                ...context,
                activeUnit: event.unit,
                target: event.target
              }
            });
            if (context.activeUnit == event.unit) return;
            controller.selectUnit(event.unit);
          },
          target: "unidadSeleccionada"
        },
        "PointerDrag.Self": {}
      }
    }
  }
};

export default unidadSeleccionada;
