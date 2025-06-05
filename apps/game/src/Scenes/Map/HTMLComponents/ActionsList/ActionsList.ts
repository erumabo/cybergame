import Alpine from "alpinejs";
import templateHTML from "./ActionsList.html?raw";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = templateHTML;

const observedAttributes = [] as const;
type Option = { option: string; value: string, icon?:string };

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
    v = v.sort((a, b) => {
      if (this.#props["actions"].some((act: Option) => act.value == a.value))
        return -1;
      if (this.#props["actions"].some((act: Option) => act.value == b.value))
        return 1;
      return a.option.localeCompare(b.option);
    });

    const added = v.filter(
      (p) => !this.#props["actions"].some((act: Option) => act.value == p.value)
    );

    this.#props["actions"].push(...added);
    //animate entry
    setTimeout(() => {
      this.#props["bufferactions"] = v.reduce((r, p) => {
        r[p.value] = true;
        return r;
      }, {} as any);
    }, 50);
    //animate exit
    setTimeout(() => {
      this.#props["actions"] = v;
    }, 100);
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
