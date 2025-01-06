import { Components } from "src/globals";
import * as Phaser from "phaser";
import World from "src/mecs";
import UnitStats from "src/Componentes/Stats";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import TilemapSprite from "src/Vistas/GameObjects/TilemapSprite";
import { MapScene } from "src/Vistas/Scenes/MapScene";

//#region Import Estados
import { createActor } from "xstate";
import stateMachine from "./StateMachine";
//#endregion Import Estados

export default class MapSceneController {
  scene: MapScene;
  world: World;
  tilemap!: TilemapSprite;

  stateActor; // Actor<infer>

  constructor(scene: MapScene) {
    this.scene = scene;

    this.world = new World();
    for (let component in Components) this.world.addComponent(component);

    this.stateActor = createActor(stateMachine, {
      input: {
        scene: this.scene,
        world: this.world
      }
    });
    this.stateActor.start();
  }

  addUnitEntity(unit: UnitSprite) {
    const entity = this.world.addEntity();

    this.world.bindEntityComponent(entity, unit, "UnitSprite");
    unit.setData("entity", entity);

    const stats = new UnitStats(80, 20);
    this.world.bindEntityComponent(entity, stats, "UnitStats");
    unit.addBar("salud", 0xff0000, stats.salud);
    unit.addBar("energia", 0x00ffff, stats.energia);

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
