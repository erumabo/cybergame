import type { StateHandler, StateContext } from "./State";
import MoveUnit from "../Sistemas/MoveUnit";

const stateHandler: StateHandler = {
  onPointerUp: (_, __) => {},
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
  },
  onPointerMove: (event, context) => {
    if (!event.target) return;
    context.target = event.target;
    context.controller.actor.send("selectTile", context);
  }
};

const unidadSeleccionada = {
  entry: (context: StateContext) => {
    context.controller.state = stateHandler;
  },
  on: {
    selectTile: {
      target: "targetSelected"
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
  }
};

export default unidadSeleccionada;
