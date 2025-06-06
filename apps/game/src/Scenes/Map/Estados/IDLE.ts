import type { Event, StateContext } from "./State";
import { MoveUnit } from "../Sistemas/MoveUnit";

const idle = {
  entry: (_: Event, context: StateContext) => {
    context.activeUnit = "";
    context.target = { x: -1, y: -1 } as any;
  },
  on: {
    "on.PointerDown.Ally": {
      action: (event: Event, context: StateContext) => {
        MoveUnit({ ...context, activeUnit: event.unit, target: event.target });
        if (context.activeUnit == event.unit) return;
        context.activeUnit = event.unit;
      },
      target: "unidadSeleccionada"
    },
    "on.PointerDrag.*": {
      action: (event: Event, context: StateContext) => {
        if (!event.pointer.isDown) return;
        const camera = context.controller.scene.cameras.main;
        camera.scrollX -= event.pointer.x - event.pointer.prevPosition.x;
        camera.scrollY -= event.pointer.y - event.pointer.prevPosition.y;
      }
    }
  }
};

export default idle;
