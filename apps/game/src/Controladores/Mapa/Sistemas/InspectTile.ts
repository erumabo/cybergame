export default function InspectAction({ world }: { world: any }) {
  world.scene.storyManager.setKnot("Investigar");
  world.scene.actionsMenu.hide();
  //world.scene.events.once("resume", () => world.scene.actionsMenu.show());
  world.scene.scene.pause();
  world.scene.scene.run("VN", { knot: "" });
}
