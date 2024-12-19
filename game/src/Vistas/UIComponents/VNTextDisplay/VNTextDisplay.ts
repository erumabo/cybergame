import Alpine from "alpinejs";
import templateHTML from "./VNTextDisplay.html?raw";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = templateHTML;

//const observedAttributes = [] as const;
//type Prop = (typeof observedAttributes)[number];

export default class VNTextDisplay extends HTMLElement {
  // implements Record<Prop, string> {
  //#props: any = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    //this.#props = Alpine.reactive(this.#props);
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    /*Alpine.addScopeToNode(this.shadowRoot as any, this.#props);
    Alpine.initTree(this.shadowRoot as any);*/
  }

  //#region Attributes
  /*static observedAttributes = observedAttributes;
  attributeChangedCallback(name: Prop, oldValue: string, newValue: string) {
    if (this[name] != newValue) this[name] = newValue;
  }*/

  //#endregion

  disconnectedCallback() {}
}

customElements.define("mb-text-display", VNTextDisplay);
