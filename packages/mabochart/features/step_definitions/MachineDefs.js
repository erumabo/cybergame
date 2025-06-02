const maquina_con_errores = {
  initial: "qA",
  states: {
    qA: {
      on: {
        tB: "qB",
        tC: "qC",
        tD: "qD",
        tE: "qE",
        t0: "q0"
      }
    },
    qB: {
      initial: "qBa",
      states: {
        qBa: {},
        qBb: {}
      },
      on: {}
    },
    qC: {
      on: {
        tB: "qB.qBb"
      }
    },
    qD: {
      initial: "qDa",
      states: {}
    },
    qE: {
      states: {
        qEa: {}
      }
    }
  }
};

const varias_transiciones = {
  padre: {}
};

const estado_externo = {
  initial: "qA",
  states: {
    qA: {
      entry: (ctx) => {
        ctx.history.push("qA.enter");
      },
      exit: (ctx) => {
        ctx.history.push("qA.exit");
      },
      on: {
        tB: "qB",
        tC: {
          action: (ctx) => {
            ctx.history.push("qA2qC");
          },
          target: "qC"
        },
        tD: "qD"
      }
    },
    qB: {
      entry: (ctx) => {
        ctx.history.push("qB.enter");
      },
      exit: (ctx) => {
        ctx.history.push("qB.exit");
      },
      on: {}
    },
    qC: {
      entry: (ctx) => {
        ctx.history.push("qC.enter");
      },
      exit: (ctx) => {
        ctx.history.push("qC.exit");
      },
      on: {}
    },
    qD: {
      entry: (ctx) => ctx.history.push("qD.enter"),
      exit: (ctx) => ctx.history.push("qD.exit"),
      initial: "qDa",
      states: {
        qDa: {
          entry: (ctx) => ctx.history.push("qDa.enter"),
          exit: (ctx) => ctx.history.push("qDa.exit"),
          on: {
            tDb: "qD.qDb",
            tA: "qA"
          }
        },
        qDb: {
          entry: (ctx) => ctx.history.push("qDb.enter"),
          exit: (ctx) => ctx.history.push("qDb.exit"),
          on: {
            tA: "qA"
          }
        }
      },
      on: {}
    }
  }
};

const glob_patterns = {
  initial: "qA",
  states: {
    qA: {
      on: {
        "t.*": "qC",
        "t.*.D": "qD",
        tB: "qB"
      }
    },
    qB: {
      on: {}
    },
    qC: {
      on: {}
    },
    qD: {
      on: {}
    }
  }
};

export { maquina_con_errores, estado_externo, glob_patterns };
