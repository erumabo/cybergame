//import SparseSet from "src/utils/SparseSet";

type Component = any; //(...args) => any | any;

export default class World {
  nextEntity: number;
  components: string[];
  componentData: Map<number, Component>[];
  entityComponents: Map<number, number>;

  constructor() {
    this.nextEntity = 0;
    this.componentData = new Array(32);
    this.components = new Array(32);
    this.entityComponents = new Map();
  }

  addEntity() {
    this.nextEntity++;
    return this.nextEntity;
  }

  addComponent(component: string) {
    const i = this.componentData.findIndex(c => c == null);
    this.componentData[i] = new Map();
    this.components[i] = component;
  }

  // if using a class, could infer type from constructor
  // but, by separating type from actual object, you can use anything
  // Instance, POJO, strings, bools, etc...
  bindEntityComponent(entity: number, component: Component, componentType: string) {
    const componentId = this.components.indexOf(componentType);
    if (componentId < 0) throw new Error("Component not found");

    this.componentData[componentId].set(entity, component);
    let componentFlags = this.entityComponents.get(entity) ?? 0;
    componentFlags = componentFlags | (1 << componentId);
    this.entityComponents.set(entity, componentFlags);

    return component;
  }

  query(...components: string[]) {
    let query: number = 0;
    for (let component of components) {
      let i = this.components.findIndex(c => c == component);
      if (i < 0) throw new Error("Component not found");
      query = query | (1 << i);
    }
    return query;
  }

  findEntities(query: number, notQuery: number = 0) {
    let entities: number[] = [];
    this.entityComponents.forEach((c, e) => {
      if ((c & query) == query && (c & notQuery) == 0) {
        entities.push(e);
      }
    });
    return entities;
  }

  getEntityComponent(entity: number, component: string) {
    const componentId = this.components.indexOf(component);
    if (componentId < 0) throw new Error("Component not found");
    return this.componentData[componentId].get(entity);
  }
  
  entityHasComponent(entity: number, component: string) {
    const componentId = this.components.indexOf(component);
    if (componentId < 0) throw new Error("Component not found");
    return this.componentData[componentId].has(entity);
  }
}
