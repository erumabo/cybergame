import Alpine from "alpinejs";
import templateHTML from "./UnitView.html?raw";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = templateHTML;

const observedAttributes = ["name"] as const;
type Prop = (typeof observedAttributes)[number];

export default class UnitView
  extends HTMLElement
  implements Record<Prop, string>
{
  #props: any = {};
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#props = Alpine.reactive(this.#props);
  }

  connectedCallback() {
    this.#props["name"] = this.getAttribute("name") ?? "";
    this.shadowRoot!.appendChild(template.content.cloneNode(true));

    Alpine.addScopeToNode(this.shadowRoot as any, this.#props);
    Alpine.initTree(this.shadowRoot as any);
  }

  //#region Attributes
  static observedAttributes = observedAttributes;

  set name(v: string) {
    this.setAttribute("name", (this.#props["name"] = v));
  }
  get name() {
    return this.#props["name"] ?? "";
  }

  attributeChangedCallback(name: Prop, _: string, newValue: string) {
    if (this[name] != newValue) this[name] = newValue;
  }
  //#endregion

  disconnectedCallback() {}
}

customElements.define("mb-unit-view", UnitView);
