import { Components, COLORS } from "src/globals";
import { World } from "@mabo/mecs";
import UnitStats from "./Models/Stats";
import UnitSprite from "./GameObjects/UnitSprite";
import { MapScene } from "./Scene";

//#region Import Estados
import type { StateHandler, Event, StateContext } from "./Estados/State";
import { StateMachine } from "@mabo/chart";
import idle from "./Estados/IDLE";
import targetSelected from "./Estados/TargetTileSelected";
import unidadSeleccionada from "./Estados/UnidadActiva";

import MoveAction from "./Sistemas/MoveUnit";
import InspectAction from "./Sistemas/InspectTile";
//#endregion Import Estados

export default class MapSceneController implements StateHandler {
  actor: StateMachine;
  context: StateContext;
  systems: { [system: string]: Function } = { MoveAction, InspectAction };
  state?: StateHandler;

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
    }).start(this.context);
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

  addUnitEntity(unit: UnitSprite) {
    const entity = this.context.world.addEntity();

    this.context.world.bindEntityComponent(entity, unit, "UnitSprite");
    unit.setData("entity", entity);

    const stats = new UnitStats(80, 20);
    this.context.world.bindEntityComponent(entity, stats, "UnitStats");
    unit.addBar("salud", COLORS["--blue-40"], stats.salud);
    unit.addBar("energia", COLORS["--green-10"], stats.energia);

    this.context.world.bindEntityComponent(entity, unit.viewNode, "DOMElement");
    unit.setDOMAttribute("name", "" + entity);

    return entity;
  }

  //#region UI Events
  onPointerDown(event: Event, context: StateContext) {
    this.state?.onPointerDown && this.state.onPointerDown(event, context);
  }
  onPointerMove(event: Event, context: StateContext) {
    this.state?.onPointerMove && this.state.onPointerMove(event, context);
  }
  onPointerUp(event: Event, context: StateContext) {
    this.state?.onPointerUp && this.state.onPointerUp(event, context);
  }

  actionMenuClick(action: string) {
    this.context.action = action;
    this.actor.send("selectAction", this.context);
  }
  //#endregion
}
