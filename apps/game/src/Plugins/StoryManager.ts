import { Plugins, Loader } from "phaser";
import type { Types } from "phaser";
import type { Story } from "inkjs";
import { Compiler } from "inkjs/full";
import { Path } from "inkjs/engine/Path";
import { marked } from "marked";
import mustache from "mustache";

class InkStoryFile extends Loader.FileTypes.TextFile {
  constructor(
    loader: Loader.LoaderPlugin,
    key: string | Types.Loader.FileTypes.TextFileConfig,
    url?: string,
    xhrSettings?: Types.Loader.XHRSettingsObject
  ) {
    super(loader, key, url, xhrSettings);
    this.cache = loader.cacheManager.custom.ink;
    if (!this.cache) loader.cacheManager.addCustom("ink");
    this.cache = loader.cacheManager.custom.ink;
  }

  override onProcess() {
    this.data = new Compiler(this.xhrLoader!.responseText).Compile();
    this.onProcessComplete();
  }
}

export default class InkStoryManager extends Plugins.BasePlugin {
  story?: Story;

  #context?: any;

  constructor(pluginManager: any) {
    super(pluginManager);

    pluginManager.registerFileType("ink", this.inkStoryFileCallback);
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

  hasContentAtPath(pathString: string) {
    let path = new Path(pathString);
    return !!this.story?.ContentAtPath(path).obj;
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
    // TODO: Set a fallback story file
    throw new Error("No story file found");
  }

  inkStoryFileCallback(
    this: Loader.LoaderPlugin,
    key:
      | string
      | Types.Loader.FileTypes.TextFileConfig
      | Array<Types.Loader.FileTypes.TextFileConfig>,
    url?: string,
    xhrSettings?: Types.Loader.XHRSettingsObject
  ): Loader.LoaderPlugin {
    if (Array.isArray(key)) {
      key.forEach((config) => this.addFile(new InkStoryFile(this, config)));
    } else {
      //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
      this.addFile(new InkStoryFile(this, key, url, xhrSettings));
    }

    return this;
  }
}
