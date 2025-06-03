import type { StateContext } from "../Estados/State";
import type { System } from "./System";

const InspectAction: System = {
  name: "inspect",
  displayName: "Observar",
  register({controller}: StateContext) {
    controller.systems.push(InspectAction);
  },
  test(context: StateContext) {
    if(!context.target || !context.activeUnit) return false;
    const position = context.controller.scene.gridEngine.getPosition(context.activeUnit);
    if(!position) return false;
    if(Math.abs(context.target.x - position.x) + Math.abs(context.target.y - position.y) > 1) return false;
    return true;
  },
  execute(context: StateContext) {
    context.controller.scene.storyManager.setContext({
      player: context.activeUnit
    });
    context.controller.scene.storyManager.setKnot("Investigar");
    context.controller.scene.actionsMenu.hide();
    context.controller.scene.scene.pause();
    context.controller.scene.scene.run("VN");
  }
};

export default InspectAction;
