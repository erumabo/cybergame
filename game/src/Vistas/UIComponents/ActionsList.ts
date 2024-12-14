import Alpine from "alpinejs";

const template: HTMLTemplateElement = document.createElement("template");
template.innerHTML = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    li {
      list-style: none inside;
    }
    button {
      width: 64px;
      height: 1rem;
    }
  </style>
  <menu>
    <template x-for="action in actions">
      <li>
        <button @click.stop.prevent="onActionClick($event, action)" x-text="action"></button>
      </li>
    </template>
  </menu>`;

type Props = "actions";

export default class ActionsMenu extends HTMLElement {
  root: ShadowRoot;
  
  #props: any = {
    onActionClick: this.onActionClick.bind(this)
  };

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.#props.actions = [] as string[];
    this.#props = Alpine.reactive(this.#props);
  }

  connectedCallback() {
    this.actions = this.getAttribute("actions") ?? "";
    this.root.appendChild(template.content.cloneNode(true));

    Alpine.addScopeToNode(this.root as any, this.#props);
    Alpine.initTree(this.root as any);
  }

  //#region Attributes
  static observedAttributes: Props[] = ["actions"];

  set actions(val: string) {
    this.#props.actions = val
      .split(",")
      .map(a => a.trim())
      .filter(act => !!act);
    this.setAttribute("actions", val);
  }

  get actions() {
    return this.#props.actions?.join() ?? "";
  }

  attributeChangedCallback(name: Props, oldValue: any, newValue: any) {
    if ((this[name] as any) != newValue) this[name] = newValue;
  }
  //#endregion

  disconnectedCallback() {}

  onActionClick(ev: Event, action: string) {
    console.log(action);
    this.dispatchEvent(new CustomEvent("action", { detail: action }));
  }
}

customElements.define("mb-action-menu", ActionsMenu);
