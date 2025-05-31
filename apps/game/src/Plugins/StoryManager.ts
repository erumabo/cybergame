import { Plugins } from "phaser";
import type { Story } from "inkjs";
import { Compiler } from "inkjs/full";
import { marked } from "marked";
import mustache from "mustache";

export default class StoryManager extends Plugins.BasePlugin {
  story?: Story;

  #context?: any;

  constructor(pluginManager: any) {
    super(pluginManager);
  }

  override init() {
    mustache.tags = ["<%", "%>"];
  }

  override destroy() {
    super.destroy();
  }

  Continue(): string | null {
    if (!this.story) throw new Error("No current story fragment");
    if (!this.story.canContinue) return null;
    const text = this.story.Continue();
    if (!text) throw new Error("Story should continue, but no text was found");
    return marked.parse(mustache.render(text, this.#context), { async: false });
  }

  setContext(context: any) {
    this.#context = context;
  }

  setKnot(knot: string, stitch?: string) {
    let frag = knot + (stitch ? "." + stitch : "");
    if (this.story) this.story.ChoosePathString(frag);
  }

  setStory(storyName: string): Story {
    const inkCache = this.game.cache.custom.ink;
    if (inkCache.has(storyName)) return (this.story = inkCache.get(storyName));

    const storyInk = this.game.cache.text.get("story_" + storyName);
    this.story = new Compiler(storyInk).Compile();
    inkCache.add(storyName, this.story);
    return this.story;
  }
}
