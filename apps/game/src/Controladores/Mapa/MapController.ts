import { Components, COLORS } from "src/globals";
import type { Input, Tilemaps } from "phaser";
import { World } from "@mabo/mecs";
import UnitStats from "src/Componentes/Stats";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import TilemapSprite from "src/Vistas/GameObjects/TilemapSprite";
import { MapScene } from "src/Vistas/Scenes/MapScene";

//#region Import Estados
import { StateMachine } from "@mabo/chart";
import idle from "./Estados/IDLE";
import targetSelected from "./Estados/TargetTileSelected";
import unidadSeleccionada from "./Estados/UnidadActiva";

import MoveAction from "./Sistemas/MoveUnit";
import InspectAction from "./Sistemas/InspectTile";
//#endregion Import Estados

export default class MapSceneController {
  scene: MapScene;
  world: World;
  tilemap!: TilemapSprite;
  actor: StateMachine;
  activeUnit: number = 0;
  target?: any;
  systems = { MoveAction, InspectAction };

  constructor(scene: MapScene) {
    this.scene = scene;

    this.world = new World();
    for (let component in Components) this.world.addComponent(component);

    this.actor = new StateMachine({
      states: { idle, targetSelected, unidadSeleccionada },
      initial: "idle"
    }).start();
  }
  
  get state() {
    return this.actor.currentState;
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
    const entity = this.world.addEntity();

    this.world.bindEntityComponent(entity, unit, "UnitSprite");
    unit.setData("entity", entity);

    const stats = new UnitStats(80, 20);
    this.world.bindEntityComponent(entity, stats, "UnitStats");
    unit.addBar("salud", COLORS["--blue-40"], stats.salud);
    unit.addBar("energia", COLORS["--green-10"], stats.energia);

    this.world.bindEntityComponent(entity, unit.viewNode, "DOMElement");
    unit.setDOMAttribute("name", "" + entity);

    return entity;
  }

  //#region UI Events
  interaccionObjeto(_: Input.Pointer, entity: number) {
    this.actor.send(this.activeUnit == entity ? "unselectUnit" : "selectUnit", {
      world: this,
      target: entity
    });
  }
  interaccionMapa(_: Input.Pointer, target: Tilemaps.Tile) {
    this.actor.send("selectTile", { world: this, target });
  }
  actionMenuClick(action: string) {
    this.actor.send("selectAction", { world: this, action });
  }
  //#endregion
}
