import { Components } from "src/globals";
import * as Phaser from "phaser";
import World from "src/mecs";
import UnitStats from "src/Componentes/Stats";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import TilemapSprite from "src/Vistas/GameObjects/TilemapSprite";
import { UnitView } from "src/Vistas/UIComponents/mb-elements";
import { MapScene } from "src/Vistas/Scenes/MapScene";

//#region Import Estados
import IMapSceneControllerState from "./Estados/IMapSceneControllerState";
import IDLE from "./Estados/IDLE";
//#endregion Import Estados

export default class MapSceneController implements IMapSceneControllerState {
  scene: MapScene;
  world: World;
  tilemap!: TilemapSprite;

  estado: IMapSceneControllerState;
  states: IMapSceneControllerState[];

  unidadActiva?: number;
  objetivo?: number | Phaser.Tilemaps.Tile;

  constructor(scene: MapScene) {
    this.scene = scene;

    this.world = new World();
    for (let component in Components) this.world.addComponent(component);

    this.states = [];
    this.states.push((this.estado = new IDLE(this)));
  }

  setState(state: new (ctx: MapSceneController) => IMapSceneControllerState) {
    let nextState = this.states.find(
      s => Object.getPrototypeOf(s) == state.prototype
    );
    if (!nextState) this.states.push((nextState = new state(this)));
    this.exit();
    this.estado = nextState;
    this.enter();
  }

  addUnitEntity(unit: UnitSprite) {
    const entity = this.world.addEntity();

    this.world.bindEntityComponent(entity, unit, "UnitSprite");
    unit.setData("entity", entity);

    const stats = new UnitStats(80, 80);
    this.world.bindEntityComponent(entity, stats, "UnitStats");
    unit.addBar("salud", 0xff0000, stats.salud);
    unit.addBar("energia", 0x00ffff, stats.energia);

    this.world.bindEntityComponent(entity, unit.viewNode, "DOMElement");
    unit.setDOMAttribute("name", "" + entity);
  }

  //#region UI Events
  interaccionObjeto(point: Phaser.Input.Pointer, entity: number) {
    this.estado.interaccionObjeto(point, entity);
  }
  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    this.estado.interaccionMapa(point, target);
  }
  actionMenuClick(action: string) {
    this.estado.actionMenuClick(action);
  }
  //#endregion

  //#region Livecycle
  enter() {
    this.estado.enter();
  }
  update(dt: number) {
    this.estado.update(dt);
  }
  exit() {
    this.estado.exit();
  }
  //#endregion
}
