import { Components } from "src/globals";
import { World } from "@mabo/mecs";
import { MapScene } from "./Scene";

//#region Import Estados
import type { UIEvent, StateContext } from "./Estados/State";
import type { System } from "./Sistemas/System";
import type { Actor } from "@mabo/chart";
import { StateMachine } from "@mabo/chart";
import type { Tilemaps } from "phaser";
import idle from "./Estados/IDLE";
import targetSelected from "./Estados/TargetTileSelected";
import unidadSeleccionada from "./Estados/UnidadActiva";

import MoveAction from "./Sistemas/MoveUnit";
import InspectAction from "./Sistemas/InspectTile";
import AttackMelee from "./Sistemas/AttackMelee";
//#endregion Import Estados

export default class MapSceneController {
  actor: Actor;
  context: StateContext;
  systems: System[] = [];

  constructor(public scene: MapScene) {
    this.scene = scene;

    this.context = {
      activeUnit: "",
      target: { x: -1, y: -1 } as any,
      world: new World()
    };
    for (let component in Components)
      this.context.world.addComponent(component);

    this.actor = new StateMachine({
      states: { idle, targetSelected, unidadSeleccionada },
      initial: "idle"
    }).start({
      context: this.context,
      controller: this,
      scene: this.scene
    });

    InspectAction.register(this);
    MoveAction.register(this);
    AttackMelee.register(this);
  }

  setTileTint({ x, y }: { x: number; y: number }, tint: number = 0xffffff) {
    for (let layer of this.scene.tilemap.layers) {
      layer.tilemapLayer.getTileAt(x, y, true).tint = tint;
      if (layer.name.includes("#")) {
        layer.tilemapLayer.getTileAt(x + 1, y, true).tint = tint;
        layer.tilemapLayer.getTileAt(x + 1, y + 1, true).tint = tint;
        layer.tilemapLayer.getTileAt(x, y + 1, true).tint = tint;
      }
    }
  }

  //#region UI Events
  onPointerHover(event: UIEvent, context: StateContext) {
    if (event.target == context.target) return;
    this.#onEvent("PointerHover.", event, context);
  }
  onPointerDown(event: UIEvent, context: StateContext) {
    this.#onEvent("PointerDown.", event, context);
  }
  onPointerDrag(event: UIEvent, context: StateContext) {
    if (event.target == context.target) return;
    this.#onEvent("PointerDrag.", event, context);
  }
  onPointerUp(event: UIEvent, context: StateContext) {
    this.#onEvent("PointerUp.", event, context);
  }

  actionMenuClick(action: string) {
    this.context.action = action;
    this.actor.send("selectAction", {
      context: this.context,
      controller: this,
      scene: this.scene
    });
  }

  selectUnit(unit?: string) {
    this.scene.events?.emit("unitChange", {
      old: this.context.activeUnit,
      new: unit
    });
    this.context.activeUnit = unit ?? "";
  }

  setTarget(target?: Tilemaps.Tile) {
    this.scene.events?.emit("targetChange", {
      old: this.context.target,
      new: target
    });
    this.context.target = target ?? ({ x: -1, y: -1 } as any);
  }

  async #onEvent(eventName: string, event: UIEvent, context: StateContext) {
    if (!event.target) return;

    const targets = this.scene.gridEngine.getCharactersAt(event.target);
    if (targets.length == 0) eventName += "Map";
    else {
      event.unit = targets[0];
      if (event.unit === context.activeUnit) eventName += "Self";
      else {
        let faction = this.scene.gridEngine
          .getContainer(event.unit)!
          .getData("faction");
        if (faction == "ally") eventName += "Ally";
        else eventName += "Enemy";
      }
    }

    await this.actor.send(eventName, {
      event,
      context,
      controller: this,
      scene: this.scene
    });
  }
  //#endregion
}
