import type { State } from "@mabo/chart";
import type { EventPayload } from "./State";
import { MoveUnit, FindPath } from "../Sistemas/MoveUnit";

function showMenu({ controller, context, scene }: EventPayload) {
  const tile = context.target,
    activeUnit = context.activeUnit;
  if (!tile || !activeUnit) throw new Error("Try to show menu without context");

  const actions: any[] = [];
  controller.systems.forEach((system) => {
    if (system.test(arguments[0]))
      actions.push({
        option: system.displayName,
        value: system.name,
        icon: system.icon
      });
  });

  let actionsMenu = scene.actionsMenu;
  let { pixelX: x, pixelY: y, width } = tile;
  actionsMenu.setPosition(x + width, y);
  actionsMenu.domNode["actions"] = actions;
  actionsMenu.show();

  const gridEngine = scene.gridEngine;
  const unit = {
    position: gridEngine.getPosition(activeUnit),
    charLayer: gridEngine.getCharLayer(activeUnit)
  };
  const target = {
    ...unit,
    position: {
      x: tile.x,
      y: tile.y
    }
  };

  const path = FindPath(activeUnit, unit, target, gridEngine).path.map(
    (p: any) => p.position
  );
  scene.renderPath(path, true);
}

const targetSelected: State = {
  initial: "target_trap",
  entry(payload: EventPayload) {
    showMenu(payload);
  },
  update(payload: EventPayload) {
    showMenu(payload);
  },

  on: {
    "PointerDrag.*": {
      action({ event, controller }: EventPayload) {
        controller.setTarget(event.target);
      },
      target: "targetSelected"
    },
    "PointerDown.*": {
      action({ event, controller }: EventPayload) {
        controller.setTarget(event.target);
      },
      target: "targetSelected"
    },
    "PointerUp.Self": {
      action({ controller }: EventPayload) {
        controller.setTarget();
      },
      target: "idle"
    },
    selectAction: {
      action({ context, controller }: EventPayload) {
        if (!context.action) throw new Error("Action undefined");
        const system = controller.systems.find(
          (sys) => sys.name == context.action
        );
        if (!system) throw new Error("No system found");
        system.execute(arguments[0]);
        controller.selectUnit();
      },
      target: "idle"
    }
  },

  exit({ controller, scene }: EventPayload) {
    controller.setTarget({ x: -1, y: -1 } as any);
    scene.actionsMenu.domNode["actions"] = [];
    scene.actionsMenu.hide();
    scene.renderPath([], true);
  },

  states: {
    target_trap: {
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
        }
      }
    }
  }
};

export default targetSelected;
