const idle = {
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
