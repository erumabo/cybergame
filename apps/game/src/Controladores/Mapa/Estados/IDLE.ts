const stateHandler = {
  onPointerDown: ({ world, tile }: any) => {
    if (!tile) return;

    let target = world.scene.gridEngine.getCharactersAt(tile);
    if (target.length == 0) return;
    target = target[0];
    world.scene.gridEngine.stopMovement(target);
    world.scene.gridEngine.moveTo(target, tile, {
      algorithm: "A_STAR",
      considerCosts: true,
      noPathFoundStrategy: "STOP",
      pathBlockedStrategy: "WAIT",
      pathBlockedWaitTimeoutMs: 2000
    });
    let event = "selectUnit";
    world.actor.send(event, { world, target });
  },
  onDrag: ({ world, pointer }: any) => {
    const camera = world.scene.cameras.main;
    camera.scrollX -= pointer.x - pointer.prevPosition.x;
    camera.scrollY -= pointer.y - pointer.prevPosition.y;
  }
};

const idle = {
  entry: ({ world }: any) => {
    world.stateHandler = stateHandler;
  },
  on: {
    selectUnit: {
      action: ({ world, target }: any) => {
        world.activeUnit = target;
      },
      target: "unidadSeleccionada"
    }
  }
};

export default idle;
