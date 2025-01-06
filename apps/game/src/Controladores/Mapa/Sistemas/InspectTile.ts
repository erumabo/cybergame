import { TContext } from "../statesTypeDef";

export default function inspectAction({ context }: { context: TContext }) {
  context.scene.storyManager.setKnot("Investigar");
  context.scene.actionsMenu.hide();
  context.scene.events.once("resume", () => context.scene.actionsMenu.show());
  context.scene.scene.pause();
  context.scene.scene.run("VN", { knot: "" });
}
