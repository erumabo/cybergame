import UnitSprite from "src/Vistas/GameObjects/UnitSprite";

export default interface IMapSceneControllerState {
  
  // Eventos de UI
  interaccionObjeto(point: Phaser.Input.Pointer, entity: number): void;
  interaccionMapa(
    point: Phaser.Input.Pointer,
    target: Phaser.Tilemaps.Tile
  ): void;
  actionMenuClick(action: string): void;
  
  // Ciclo de vida
  enter(): void;
  update(dt: number): void;
  exit(): void;
}
