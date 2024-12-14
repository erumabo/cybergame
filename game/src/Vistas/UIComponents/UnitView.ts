const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = `
  <style>
    h1 {
      background: aqua;
      font-size: 1rem;
      bottom: 
    }
  </style>
  <h1>
  Aqua!
  </h1>
`;

export default class UnitView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.actions = this.getAttribute("actions") ?? "";
  }

  //#region Attributes
  static observedAttributes = ["actions"];

  #actions: string[] | undefined;
  set actions(val: string) {
    this.#actions = val
      .split(",")
      .map(a => a.trim())
      .filter(act => !!act);
    this.setAttribute("actions", val);
    this.render();
  }
  get actions() {
    return this.#actions?.join() ?? "";
  }

  attributeChangedCallback(name: "actions", oldValue: any, newValue: any) {
    console.log(`Attribute ${name} has changed.`);
    if ((this[name] as any) != newValue) this[name] = newValue;
  }
  //#endregion

  disconnectedCallback() {}

  render() {
    console.log("render");
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("mb-unit-view", UnitView);
