//import { UnitView } from "./UnitView.js";
import _ from "underscore";

const template: HTMLTemplateElement = document.getElementById(
  "map-view-template"
) as HTMLTemplateElement;
/*document.createElement("template");
template.innerHTML = `<div>
<span></span>
<span></span>
    </div>`;*/

export class MapView extends HTMLElement {
  //static observedAttributes = [];
  //#UIReady: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    //this.#UIReady = true;
  }

  attributeChangedCallback(name: string, _: any, __: any) {
    console.log(`Attribute ${name} has changed.`);
  }

  disconnectedCallback() {}
}

customElements.define("mb-map-view", MapView);
