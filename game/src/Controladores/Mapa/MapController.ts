import * as Phaser from "phaser";
import { World } from "src/mecs";
import UnitStats from "src/Componentes/Stats";
import UnitSprite from "src/Vistas/GameObjects/UnitSprite";
import UnitView from "src/Vistas/UIComponents/UnitView";

//#region Import Estados
import IMapSceneControllerState from "./Estados/IMapSceneControllerState";
import IDLE from "./Estados/IDLE";
//#endregion Import Estados

export default class MapSceneController implements IMapSceneControllerState {
  scene: Phaser.Scene;
  world: World;
  estado: IMapSceneControllerState;
  unidadActiva: int;
  states: Map<string, IMapSceneControllerState>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    
    this.world = new World();
    this.world.addComponent(UnitStats);
    this.world.addComponent(UnitSprite);
    this.world.addComponent(Phaser.GameObjects.DOMElement);
    
    this.states = new Map();
    this.states.set("IDLE", (this.estado = new IDLE(this)));
  }

  setState(state: IMapSceneControllerState) {
    this.estado.exit();
    this.estado = state;
    this.estado.enter();
  }

  addUnitEntity(unit: UnitSprite) {
    const entity = this.world.addEntity();

    this.world.bindEntityComponent(entity, unit, UnitSprite);

    const stats = this.world.addEntityComponent(entity, UnitStats, 80, 80);
    unit.addBar("salud", 0xff0000, stats.salud);
    unit.addBar("energia", 0x00ffff, stats.energia);
  
    const htmlElement = this.scene.add.dom(0, 0, new UnitView());
    unit.add(htmlElement);
    this.world.bindEntityComponent(entity, htmlElement, Phaser.GameObjects.DOMElement);
  }

  onUnitSelected(point: Phaser.Input.Pointer, unit: UnitSprite) {
    this.estado.onUnitSelected(point, unit);
  }

  onTileSelected(point: Phaser.Input.Pointer, tile: Phaser.Tilemaps.Tile) {
    this.estado.onTileSelected(point, tile);
  }

  enter() {}
  update(dt: number) {
    this.estado.update(dt);
  }
  exit() {}
}
