import type { StateContext } from "../Estados/State";

export default function InspectAction(context: StateContext) {
  context.controller.scene.storyManager.setContext({
    player: context.activeUnit
  });
  context.controller.scene.storyManager.setKnot("Investigar");
  context.controller.scene.actionsMenu.hide();
  //world.scene.events.once("resume", () => world.scene.actionsMenu.show());
  context.controller.scene.scene.pause();
  context.controller.scene.scene.run("VN");
}
