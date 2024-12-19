import Alpine from "alpinejs";
import templateHTML from "./ActionsList.html?raw";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = templateHTML;

const observedAttributes = ["actions"] as const;
type Prop = (typeof observedAttributes)[number];

export default class ActionsMenu
  extends HTMLElement
  implements Record<Prop, string>
{
  #props: any = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#props = Alpine.reactive(this.#props);
    this.#props["onActionClick"] = this.onActionClick.bind(this);
  }

  connectedCallback() {
    this.#props["actions"] = ActionsMenu.parseActions(
      this.getAttribute("actions") ?? ""
    );
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    Alpine.addScopeToNode(this.shadowRoot as any, this.#props);
    Alpine.initTree(this.shadowRoot as any);
  }

  //#region Attributes
  static observedAttributes = observedAttributes;

  static parseActions(actions: string) {
    return actions
      .split(",")
      .map((a) => a.trim())
      .filter((act) => !!act);
  }
  set actions(v: string) {
    this.setAttribute(
      "actions",
      (this.#props["actions"] = ActionsMenu.parseActions(v))
    );
  }
  get actions() {
    return this.#props["actions"] ?? "";
  }

  attributeChangedCallback(name: Prop, oldValue: string, newValue: string) {
    if (this[name] != newValue) this[name] = newValue;
  }

  //#endregion

  disconnectedCallback() {}

  onActionClick(ev: Event, action: string) {
    this.dispatchEvent(new CustomEvent("action", { detail: action }));
  }
}

customElements.define("mb-action-menu", ActionsMenu);
