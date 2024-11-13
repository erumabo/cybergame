const template = document.createElement("template");
template.innerHTML = `<div>
    </div>`;

export class UnitView extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  disconnectedCallback() {}
}

customElements.define("mb-unit-view", UnitView);
