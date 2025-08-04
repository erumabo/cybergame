import UnitSprite from "./UnitSprite";
import type { Actor } from "@mabo/chart";
import type { Scene } from "phaser";
import { StateMachine } from "@mabo/chart";

interface UpdateEvent {
  scene: Scene;
  unit: EnemyUnit;
  dt: number;
}

const FSM = new StateMachine({
  initial: "IDLE",
  states: {
    IDLE: {
      initial: "DETECTING",
      update(_: UpdateEvent) {},
      states: {
        DETECTING: {
          update(ev: UpdateEvent) {
            console.log(ev.dt);
          },
          on: {
            update: {
              action(ev: UpdateEvent) {
                console.log(ev.dt);
              }
            }
          }
        }
      },
      on: {}
    },
    CHASE: {
      on: {}
    },
    ATTACK: {
      on: {}
    },
    RETURNING: {
      on: {}
    }
  }
});

export default class EnemyUnit extends UnitSprite {
  actor: Actor;

  constructor(scene: Scene) {
    super(scene);
    this.actor = FSM.start({
      scene,
      unit: this
    });
  }

  preUpdate(dt: number, t: number) {
    super.preUpdate(dt, t);
  }
}
