import System from "./System";

export default class World {
  systems: Map<string, System>; // replace with Trie<string, System>
  entities: number[]; // replace with bTree<number, Component[]>
  nextEntity: number;
  components: Class[];
  componentData: Map<number, any>[];
  entityComponents: Map<number, number>;

  constructor() {
    this.systems = new Map();
    this.entities = [];
    this.nextEntity = 0;
    this.componentData = new Array(32);
    this.components = new Array(32);
    this.entityComponents = new Map();
  }

  addSystem(system: System) {
    this.systems.set(system.name, system);
  }

  updateSystem(system: string, data: any) {
    if (this.systems.has(system)) {
      this.systems.get(system)!.update(data);
    }
  }

  addEntity() {
    this.entities.push(++this.nextEntity);
    return this.nextEntity;
  }

  addComponent(component: Class) {
    const i = this.componentData.findIndex(c => c == null);
    this.componentData[i] = new Map();
    this.components[i] = component;
    return i;
  }

  addEntityComponent(entity: number, component: any) {
    const componentId: number | null = this.components.findIndex(
      c => component instanceof c
    );
    if (componentId < 0) throw new Error("Component not found");
    this.componentData[componentId].set(entity, component);
    let componentFlags = this.entityComponents.get(entity) ?? 0;
    componentFlags = componentFlags | (1 << componentId);
    this.entityComponents.set(entity, componentFlags);
  }
}
