import type { EventPayload } from "./State";
import { MoveUnit } from "../Sistemas/MoveUnit";

const idle = {
  entry({ controller }: EventPayload) {
    controller.selectUnit();
    controller.setTarget();
  },
  on: {
    "PointerDown.Ally": {
      action({ event, context, controller }: EventPayload) {
        MoveUnit({
          ...arguments[0],
          context: { ...context, activeUnit: event.unit, target: event.target }
        });
        if (context.activeUnit == event.unit) return;
        controller.selectUnit(event.unit);
      },
      target: "unidadSeleccionada"
    },
    "PointerDrag.*": {
      action({ event, scene }: EventPayload) {
        if (!event.pointer.isDown) return;
        const camera = scene.cameras.main;
        camera.scrollX -= event.pointer.x - event.pointer.prevPosition.x;
        camera.scrollY -= event.pointer.y - event.pointer.prevPosition.y;
      }
    }
  }
};

export default idle;
