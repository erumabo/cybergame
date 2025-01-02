import * as Phaser from "phaser";
import * as ink from "inkjs";

export default class StoryManager extends Phaser.Plugins.BasePlugin {
  story?: ink.Story;

  constructor(pluginManager:any) {
    super(pluginManager);
  }

  setStory(story: ink.Story) {
    this.story = story;
  }

  setKnot(knot: string, stitch?: string) {
    let frag = knot + (stitch ? "." + stitch : "");
    if (this.story) this.story.ChoosePathString(frag);
  }
}
