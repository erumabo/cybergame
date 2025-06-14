import type { EventPayload } from "../Estados/State";
import type { System } from "./System";

const InspectAction: System = {
  name: "inspect",
  displayName: "Observar",
  icon: "search",
  register(controller) {
    controller.systems.push(InspectAction);
  },
  test({ context, scene }: EventPayload) {
    if (!context.target || !context.activeUnit) return false;
    const position = scene.gridEngine.getPosition(context.activeUnit);
    if (!position) return false;
    if (
      Math.abs(context.target.x - position.x) +
        Math.abs(context.target.y - position.y) >
      1
    )
      return false;
    return true;
  },
  execute({ context, scene }: EventPayload) {
    scene.storyManager.setContext({
      player: context.activeUnit
    });
    scene.storyManager.setKnot("Investigar");
    scene.actionsMenu.hide();
    scene.scene.pause();
    scene.scene.run("VN");
  }
};

export default InspectAction;
