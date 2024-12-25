/*
import Alpine from "alpinejs";

export default class BaseComponent<Prop> extends HTMLElement {
  #props: any = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#props = Alpine.reactive(this.#props);
  }

  connectedCallback() {
    Alpine.addScopeToNode(this.shadowRoot as any, this.#props);
    Alpine.initTree(this.shadowRoot as any);
  }

  //#region Attributes
  static observedAttributes: readonly string[] = ["attribute"];
  attributeChangedCallback(name: Prop, oldValue: string, newValue: string) {
    if (this[name] != newValue) this[name] = newValue;
  }
  
  set attribute(v: string) {
    this.setAttribute(attribute, (this.#props[attribute] = v));
  }
  get attribute() {
    return this.#props[attribute] ?? "";
  }

  //#endregion

  disconnectedCallback() {}
}
*/