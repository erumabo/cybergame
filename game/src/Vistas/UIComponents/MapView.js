//import { UnitView } from "./UnitView.js";
//import Backbone from "backbone";
import _ from "underscore";

const template = document.getElementById("map-view-template");
/*document.createElement("template");
template.innerHTML = `<div>
<span></span>
<span></span>
    </div>`;*/

export class MapView extends HTMLElement {
  //static observedAttributes = [];
  #model;
  #UIReady = false;

  get model() {
    return this.#model;
  }
  set model(_model) {
    this.#model = _model;
    this.bindModelEvents();
    return this.#model;
  }

  constructor() {
    super();
    _.extend(this, Backbone.Events);

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#UIReady = true;
  }

  //attributeChangedCallback(name, oldValue, newValue) {
  //  console.log(`Attribute ${name} has changed.`);
  //}

  disconnectedCallback() {
    this.stopListening();
  }

  // TODO: Move to UnitView class
  /*bindModelEvents() {
    this.listenTo(this.#model, "change:activeUnit", () => {
      if (!this.#UIReady) return;
      if (this.#model.has("activeUnit")) {
        const unit = this.#model.get("activeUnit");
        this.shadowRoot.getElementById("unitId").innerText = unit.get("id");
        this.shadowRoot.getElementById("unitImage").src = `/assets/Chars/${unit.get("id")}.png`
        this.shadowRoot.getElementById("unitImage").style.display = "inline-block"
      } else {
        this.shadowRoot.getElementById("unitId").innerHTML = "";
        this.shadowRoot.getElementById("unitActions").innerHTML = "";
        this.shadowRoot.getElementById("unitImage").style.display = "none";
      }
    });

    this.listenTo(this.#model, "change:target", () => {
      if (!this.#UIReady) return;
      if (!this.#model.has("activeUnit")) return;
      const unit = this.#model.get("activeUnit");
      const actionView = this.shadowRoot.getElementById("unitActions");
      actionView.innerHTML = "";
      if (this.#model.has("target")) {
        unit.skills.forEach(skill => {
          if (skill.validTarget(this.#model.get("target"), this.#model)) {
            let action = document.createElement("li");
            let actionButton = document.createElement("button");
            actionButton.innerText = skill.name;
            actionButton.addEventListener("click", () => skill.use(this.#model.get("target"), this.#model) )
            actionView.appendChild(actionButton);
            actionView.appendChild(action);
          }
        });
      }
    });
  }*/
}

customElements.define("mb-map-view", MapView);
