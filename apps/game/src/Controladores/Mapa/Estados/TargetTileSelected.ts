import { enqueueActions } from "xstate";
import type { MAction, TContext } from "../statesTypeDef";

const targetSelected = {
  entry: ({ context }: { context: TContext }) => {
    let actionsMenu = context.scene.actionsMenu;
    const tile = context.target as Phaser.Tilemaps.Tile;
    let { pixelX: x, pixelY: y, width } = tile;
    actionsMenu.setPosition(x + width, y);
    actionsMenu.domNode["actions"] = "Move,Inspect";
    actionsMenu.show();
  },
  
  on: {
    selectTile: {
      target: "targetSelected",
      reenter: true,
      actions: enqueueActions(({ event, enqueue }) => {
        enqueue.assign({
          target: event.target
        });
      }) as MAction
    },
    
    selectAction: {
      actions: enqueueActions(({ event, enqueue }) => {
        enqueue({ type: event.action });
      }) as MAction
    },
    
    gotoUnidadSeleccionada: {
      target: "unidadSeleccionada"
    }
  },
  
  exit: enqueueActions(({ context, enqueue }) => {
    enqueue.assign({ target: undefined });
    context.scene.actionsMenu.domNode["actions"] = "";
    context.scene.actionsMenu.hide();
  }) as MAction
};
export default targetSelected;
