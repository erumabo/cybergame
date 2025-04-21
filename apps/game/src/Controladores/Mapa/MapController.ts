import { Components, COLORS } from "src/globals";
import * as Phaser from "phaser";
import World from "src/mecs";
import UnitStats from "src/Componentes/Stats";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import TilemapSprite from "src/Vistas/GameObjects/TilemapSprite";
import { MapScene } from "src/Vistas/Scenes/MapScene";

//#region Import Estados
import { createActor } from "xstate";
import stateMachine from "./StateMachine";
import type { TContext } from "./statesTypeDef";
//#endregion Import Estados

export default class MapSceneController {
  scene: MapScene;
  world: World;
  tilemap!: TilemapSprite;
  oldContext: TContext;

  stateActor; // Actor<infer>

  constructor(scene: MapScene) {
    this.scene = scene;

    this.world = new World();
    this.oldContext = { scene: this.scene, world: this.world };
    for (let component in Components) this.world.addComponent(component);

    this.stateActor = createActor(stateMachine, {
      input: {
        scene: this.scene,
        world: this.world
      }
    });
    this.stateActor.start();
    this.stateActor.subscribe((state) => this.stateChange(state));
  }

  stateChange({ context }: { context: TContext }) {
    if (this.oldContext.target != context.target) {
      this.oldContext.target &&
        typeof this.oldContext.target != "number" &&
        this.setTileTint(this.oldContext.target);
      context.target &&
        typeof context.target != "number" &&
        this.setTileTint(context.target, 0xe0e0e0);
    }
    this.oldContext = context;
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
  interaccionObjeto(point: Phaser.Input.Pointer, entity: number) {
    this.stateActor.send({ type: "selectUnit", target: entity, point });
  }
  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    this.stateActor.send({ type: "selectTile", target, point });
  }
  actionMenuClick(action: string) {
    this.stateActor.send({ type: "selectAction", action });
  }
  //#endregion
}
