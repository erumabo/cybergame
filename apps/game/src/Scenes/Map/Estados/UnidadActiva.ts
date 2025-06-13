import type { Event, StateContext } from "./State";
import { MoveUnit } from "../Sistemas/MoveUnit";

const unidadSeleccionada = {
  initial: "unit_trap",
  entry(_: Event, __: StateContext) {},
  on: {
    "PointerDown.*": {
      action(event: Event, context: StateContext) {
        context.target = event.target;
      },
      target: "targetSelected"
    },
    "PointerDrag.*": {
      action(event: Event, context: StateContext) {
        context.target = event.target;
      },
      target: "targetSelected"
    }
  },

  states: {
    unit_trap: {
      on: {
        "PointerDown.Ally": {
          action(event: Event, context: StateContext) {
            MoveUnit({
              ...context,
              activeUnit: event.unit,
              target: event.target
            });
            if (context.activeUnit == event.unit) return;
            context.activeUnit = event.unit;
          },
          target: "unidadSeleccionada"
        },
        "PointerDrag.Self": {}
      }
    }
  }
};

export default unidadSeleccionada;
