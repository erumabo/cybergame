import UnitSprite from "src/Vistas/GameObjects/UnitSprite";

export default interface IMapSceneControllerState {
  onUnitSelected(point: Phaser.Input.Pointer, target: UnitSprite): void;
  onTileSelected(
    point: Phaser.Input.Pointer,
    target: Phaser.Tilemaps.Tile
  ): void;
  enter(): void;
  update(dt: number): void;
  exit(): void;
}
