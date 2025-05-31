import type { State } from "@mabo/chart";
import type { StateHandler, StateContext } from "./State";
import MoveUnit from "../Sistemas/MoveUnit";

const stateHandler: StateHandler = {
  onPointerUp: (event, context) => {
    if (!event.target) return;
    context.target = event.target;
    context.controller.actor.send("selectTile", context);
  },
  onPointerMove: (event, context) => {
    if (!event.target) return;
    context.target = event.target;
    context.controller.actor.send("selectTile", context).then(() => console.log("Yramsitoom"))
    console.log("Return");
  },
  onPointerDown: (event, context) => {
    if (!event.target) return;

    const gridEngine = context.controller.scene.gridEngine;

    let targets = gridEngine.getCharactersAt(event.target);
    let eventName;
    if (targets.length == 0) {
      eventName = "selectTile";
      context.target = event.target;
    } else {
      eventName = "selectUnit";
      let unit = targets[0];
      MoveUnit({ ...context, activeUnit: unit, target: event.target });
      if (context.activeUnit == unit) return;
      context.activeUnit = unit;
    }

    context.controller.actor.send(eventName, context);
  }
};

function showMenu({ controller, target: tile, activeUnit }: StateContext) {
  if (!tile || !activeUnit) throw new Error("Try to show menu without context");

  let actionsMenu = controller.scene.actionsMenu;
  let { pixelX: x, pixelY: y, width } = tile;
  actionsMenu.setPosition(x + width, y);
  actionsMenu.domNode["actions"] = "Move,Inspect";
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

  const path = gridEngine
    .findShortestPath(unit, target, {
      shortestPathAlgorithm: "A_STAR",
      considerCosts: true,
      collisionGroups: gridEngine.getCollisionGroups(activeUnit)
    })
    .path.map((p: any) => p.position);
  controller.scene.renderPath(path, true);
}

const targetSelected: State = {
  entry: (context: StateContext) => {
    context.controller.state = stateHandler;
    showMenu(context);
  },
  update: (context: StateContext) => {
    showMenu(context);
    console.log("Updated");
  },

  on: {
    selectTile: {
      target: "targetSelected"
    },

    selectAction: {
      action: (context: StateContext) => {
        if (!context.action) throw new Error("Action undefined");
        context.controller.systems[context.action + "Action"](context);
      },
      target: "idle"
    },

    unselectUnit: {
      action: (context: StateContext) => {
        context.activeUnit = undefined;
      },
      target: "idle"
    },
    selectUnit: {
      target: "unidadSeleccionada"
    }
  },

  exit: (context: StateContext) => {
    context.target = { x: -1, y: -1 } as any;
    context.controller.scene.actionsMenu.domNode["actions"] = "";
    context.controller.scene.actionsMenu.hide();
    context.controller.scene.renderPath([], true);
  }
};

export default targetSelected;
