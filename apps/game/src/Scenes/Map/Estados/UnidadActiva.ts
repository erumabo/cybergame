import type { Event, StateContext } from "./State";
import { MoveUnit } from "../Sistemas/MoveUnit";

const unidadSeleccionada = {
  entry: (_: Event, __: StateContext) => {},
  on: {
    "on.PointerDown.Map": {
      action: (event: Event, context: StateContext) => {
        context.target = event.target;
      },
      target: "targetSelected"
    },
    "on.PointerDown.Ally": {
      action: (event: Event, context: StateContext) => {
        MoveUnit({ ...context, activeUnit: event.unit, target: event.target });
        if (context.activeUnit == event.unit) return;
        context.activeUnit = event.unit;
      },
      target: "unidadSeleccionada"
    },
    "on.PointerDrag.Map": {
      action: (event: Event, context: StateContext) => {
        context.target = event.target;
      },
      target: "targetSelected"
    },
  }
};

export default unidadSeleccionada;
