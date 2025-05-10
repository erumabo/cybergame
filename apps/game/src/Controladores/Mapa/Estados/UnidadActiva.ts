const unidadSeleccionada = {
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
