import { Components } from "src/globals";
import { World } from "@mabo/mecs";
//import UnitStats from "./Models/Stats";
//import UnitSprite from "./GameObjects/UnitSprite";
import { MapScene } from "./Scene";

//#region Import Estados
import type { Event, StateContext } from "./Estados/State";
import type { System } from "./Sistemas/System";
import { StateMachine } from "@mabo/chart";
import idle from "./Estados/IDLE";
import targetSelected from "./Estados/TargetTileSelected";
import unidadSeleccionada from "./Estados/UnidadActiva";

import MoveAction from "./Sistemas/MoveUnit";
import InspectAction from "./Sistemas/InspectTile";
//#endregion Import Estados

export default class MapSceneController {
  actor: StateMachine;
  context: StateContext;
  systems: System[] = [];

  constructor(public scene: MapScene) {
    this.scene = scene;

    this.context = {
      activeUnit: "",
      controller: this,
      target: { x: -1, y: -1 } as any,
      world: new World()
    };
    for (let component in Components)
      this.context.world.addComponent(component);

    this.actor = new StateMachine({
      states: { idle, targetSelected, unidadSeleccionada },
      initial: "idle"
    }).start({}, this.context);
    
    InspectAction.register(this.context);
    MoveAction.register(this.context);
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
  onPointerHover(event: Event, context: StateContext) {
    this.#onEvent("on.PointerHover.", event, context);
  }
  onPointerDown(event: Event, context: StateContext) {
    this.#onEvent("on.PointerDown.", event, context);
  }
  onPointerDrag(event: Event, context: StateContext) {
    this.#onEvent("on.PointerDrag.", event, context);
  }
  onPointerUp(event: Event, context: StateContext) {
    this.#onEvent("on.PointerUp.", event, context);
  }

  actionMenuClick(action: string) {
    this.context.action = action;
    this.actor.send("selectAction", {}, this.context);
  }

  #onEvent(eventName: string, event: Event, context: StateContext) {
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
    this.actor.send(eventName, event, context);
  }
  //#endregion
}
