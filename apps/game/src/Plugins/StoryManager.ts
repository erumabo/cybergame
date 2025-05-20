import { Plugins } from "phaser";
import type { Story } from "inkjs";

export default class StoryManager extends Plugins.BasePlugin {
  story?: Story;

  constructor(pluginManager: any) {
    super(pluginManager);
  }

  setStory(story: Story) {
    this.story = story;
  }

  setKnot(knot: string, stitch?: string) {
    let frag = knot + (stitch ? "." + stitch : "");
    if (this.story) this.story.ChoosePathString(frag);
  }
}
