import type { State } from "@mabo/chart";

function showMenu({ world }: any) {
  let actionsMenu = world.scene.actionsMenu;
  const tile = world.target as Phaser.Tilemaps.Tile;
  let { pixelX: x, pixelY: y, width } = tile;
  actionsMenu.setPosition(x + width, y);
  actionsMenu.domNode["actions"] = "Move,Inspect";
  actionsMenu.show();

  const unit = {
    position: world.scene.gridEngine.getPosition(""+world.activeUnit)
  };
  const target = {
    position: {
      x: tile.x,
      y: tile.y
    }
  };
  
  const path = world.scene.gridEngine.findShortestPath(unit, target,  {
    shortestPathAlgorithm: "A_STAR",
    considerCosts: true,
    collisionGroups: world.scene.gridEngine.getCollisionGroups(""+world.activeUnit)
  }).path;
  world.scene.renderPath(path.map((p: any) => p.position), true);
}

const targetSelected: State = {
  entry: showMenu,
  update: showMenu,

  on: {
    selectTile: {
      action: ({ world, target }: any) => {
        world.target = target;
      },
      target: "targetSelected"
    },

    selectAction: {
      action: ({ world, action }: any) => {
        world.systems[action + "Action"]({ world });
      },
      target: "unidadSeleccionada"
    },

    unselectUnit: {
      action: ({ world }: any) => {
        world.activeUnit = null;
      },
      target: "idle"
    },
    selectUnit: {
      action: ({ world, target }: any) => {
        world.activeUnit = target;
      },
      target: "unidadSeleccionada"
    }
  },

  exit: ({ world }: any) => {
    world.target = undefined;
    world.scene.actionsMenu.domNode["actions"] = "";
    world.scene.actionsMenu.hide();
    world.scene.renderPath([], true)
  }
};

export default targetSelected;
