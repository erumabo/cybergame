import Alpine from "alpinejs";
import templateHTML from "./ActionsList.html?raw";
import lucideCSS from "lucide-static/font/lucide.css?raw";
import commonCSS from "/stylesheets/common.css?raw";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = `<style>
${commonCSS}
${lucideCSS}
</style>
${templateHTML}`;

const observedAttributes = [] as const;
type Option = { option: string; value: string; icon?: string };

export default class ActionsMenu extends HTMLElement {
  declare shadowRoot: ShadowRoot;
  //declare prop: string; //observed attrs

  #props: any = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#props = Alpine.reactive(this.#props);
    this.#props["onActionClick"] = this.onActionClick.bind(this);
  }

  connectedCallback() {
    this.#props["actions"] = [];
    this.#props["bufferactions"] = [];
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    Alpine.addScopeToNode(this.shadowRoot as any, this.#props);
    Alpine.initTree(this.shadowRoot as any);

    /**new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.dispatchEvent(
          new CustomEvent("resize", { detail: entry.contentRect })
        );
      }
    }).observe(this.shadowRoot.querySelector("menu")!);**/
  }

  //#region Attributes
  static observedAttributes = observedAttributes;

  set actions(v: Option[]) {
    const current: Option[] = this.#props["actions"];
    const added = v
      .filter((p) => !current.some((act: Option) => act.value == p.value))
      .sort((a, b) => a.option.localeCompare(b.option));
    const keep = current.filter((p: Option) =>
      v.some((act: Option) => act.value == p.value)
    );

    //animate exit
    this.#props["actions"].push(...added);
    this.#props["bufferactions"] = keep.reduce(
      (r, p) => ((r[p.value] = 1), r),
      {} as any
    );

    //animate entry
    setTimeout(() => {
      this.#props["bufferactions"] = v.reduce(
        (r, p) => ((r[p.value] = 1), r),
        {} as any
      );
      this.#props["actions"] = keep.concat(added);
    }, 120);
  }

  get actions() {
    return this.#props["actions"] ?? [];
  }

  //attributeChangedCallback(name: string, _: any, newValue: any) {
  //  if (this[name] != newValue) this[name] = newValue;
  //}

  //#endregion

  disconnectedCallback() {}

  onActionClick(_: Event, action: string) {
    this.dispatchEvent(new CustomEvent("action", { detail: action }));
  }

  show() {
    this.style.width = "64px";
    this.style.display = "block";
    this.style.visibility = "visible";
  }
  hide() {
    this.style.width = "0";
    this.style.display = "none";
    this.style.visibility = "hidden";
  }
}

customElements.define("mb-action-menu", ActionsMenu);
