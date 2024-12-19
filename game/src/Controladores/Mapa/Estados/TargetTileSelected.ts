import * as Phaser from "phaser";

import IMapSceneControllerState from "./IMapSceneControllerState";
import MapSceneController from "../MapController";
import UnidadActiva from "./UnidadActiva";

import move from "../Sistemas/MoveUnit";
import { ActionsList } from "src/Vistas/UIComponents/mb-elements";

function inspect(ctx: MapSceneController) {
  ctx.scene.storyManager.setKnot("Investigar");
  ctx.scene.scene.pause();
  ctx.scene.scene.run("VN", "");
}

export default class TargetTileSelected {
  context: MapSceneController;
  constructor(context: MapSceneController) {
    this.context = context;
  }

  //#region UI Events
  interaccionObjeto(point: Phaser.Input.Pointer, target: number) {
    //this.context.objetivo = target;
  }

  interaccionMapa(point: Phaser.Input.Pointer, target: Phaser.Tilemaps.Tile) {
    this.context.objetivo = target;
    this.enter();
  }

  actionMenuClick(action: string) {
    switch (action) {
      case "Move":
        move(this.context);
        this.context.setState(UnidadActiva);
        break;
      case "Inspect":
        inspect(this.context);
        break;
      default:
        break;
    }
  }
  //#endregion

  //#region Livecycle
  enter() {
    let actionsMenu = this.context.scene.actionsMenu;
    const tile = this.context.objetivo as Phaser.Tilemaps.Tile;
    let { pixelX: x, pixelY: y, width, height } = tile;
    actionsMenu.setPosition(x + width, y);
    actionsMenu.domNode["actions"] = "Move,Inspect";
    actionsMenu.show();
  }

  update(dt: number) {}

  exit() {
    this.context.objetivo = undefined;
    this.context.scene.actionsMenu.domNode["actions"] = "";
    this.context.scene.actionsMenu.hide();
  }
  //#endregion

  //#region Systems

  //#endregion
}
