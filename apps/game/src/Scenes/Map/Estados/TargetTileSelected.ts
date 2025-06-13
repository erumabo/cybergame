import type { State } from "@mabo/chart";
import type { Event, StateContext } from "./State";
import { MoveUnit, FindPath } from "../Sistemas/MoveUnit";

function showMenu({ controller, target: tile, activeUnit }: StateContext) {
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

  let actionsMenu = controller.scene.actionsMenu;
  let { pixelX: x, pixelY: y, width } = tile;
  actionsMenu.setPosition(x + width, y);
  actionsMenu.domNode["actions"] = actions;
  actionsMenu.show();

  const gridEngine = controller.scene.gridEngine;
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
  controller.scene.renderPath(path, true);
}

const targetSelected: State = {
  initial: "target_trap",
  entry(_: Event, context: StateContext) {
    showMenu(context);
  },
  update(_: Event, context: StateContext) {
    showMenu(context);
  },

  on: {
    "PointerDrag.*": {
      action(event: Event, context: StateContext) {
        context.target = event.target;
      },
      target: "targetSelected"
    },
    "PointerDown.*": {
      action(event: Event, context: StateContext) {
        context.target = event.target;
      },
      target: "targetSelected"
    },
    "PointerUp.Self": {
      action(_: Event, context: StateContext) {
        context.target = undefined;
      },
      target: "idle"
    },
    selectAction: {
      action(_: Event, context: StateContext) {
        if (!context.action) throw new Error("Action undefined");
        const system = context.controller.systems.find(
          (sys) => sys.name == context.action
        );
        if (!system) throw new Error("No system found");
        system.execute(context);
      },
      target: "idle"
    }
  },

  exit(_: Event, context: StateContext) {
    context.target = { x: -1, y: -1 } as any;
    context.controller.scene.actionsMenu.domNode["actions"] = [];
    context.controller.scene.actionsMenu.hide();
    context.controller.scene.renderPath([], true);
  },

  states: {
    target_trap: {
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
        }
      }
    }
  }
};

export default targetSelected;
