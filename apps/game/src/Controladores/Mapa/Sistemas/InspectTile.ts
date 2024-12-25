import { TContext } from "../statesTypeDef";

export default function inspectAction({ context }: { context: TContext }) {
  context.scene.storyManager.setKnot("Investigar");
  context.scene.scene.pause();
  context.scene.scene.run("VN", { knot: "" });
}