const stateHandler = {
  onPointerDown: ({ world, tile }: any) => {
    if (!tile) return;

    let target = world.scene.gridEngine.getCharactersAt(tile);
    let event;
    if (target.length == 0) {
      event = "selectTile";
      target = tile;
    } else {
      target = target[0];
      world.scene.gridEngine.stopMovement(target);
      world.scene.gridEngine.moveTo(target, tile, {
        algorithm: "A_STAR",
        considerCosts: true,
        noPathFoundStrategy: "STOP",
        pathBlockedStrategy: "WAIT",
        pathBlockedWaitTimeoutMs: 2000
      });
      if (world.activeUnit == target) return;
      event = "selectUnit";
    }
    world.actor.send(event, { world, target });
  },
  onDrag: ({ world, tile }: any) => {
    if (!tile) return;

    let event = "selectTile";
    let target = tile;
    world.actor.send(event, { world, target });
  }
};

const unidadSeleccionada = {
  entry: ({ world }: any) => {
    world.stateHandler = stateHandler;
  },
  on: {
    selectTile: {
      action: ({ world, target }: any) => {
        world.target = target;
      },
      target: "targetSelected"
    },
    unselectUnit: {
      action: ({ world }: any) => {
        world.activeUnit = null;
      },
      target: "idle"
    },
    selectUnit: {
      action: ({ world, target }: any) => {
        world.activeUnit = target;
      },
      target: "unidadSeleccionada"
    }
  }
};

export default unidadSeleccionada;
