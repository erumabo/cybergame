export class World {
  nextEntity: number;
  components: Class[];
  componentData: Map<number, any>[];
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

  addComponent(component: Class) {
    const i = this.componentData.findIndex(c => c == null);
    this.componentData[i] = new Map();
    this.components[i] = component;
  }

  addEntityComponent(
    entity: number,
    componentType: new (...params: any[]) => Class,
    ...params: any[]
  ) {
    const component = new componentType(...params);
    return this.bindEntityComponent(entity, component, componentType);
  }

  bindEntityComponent(entity: number, component: any, componentType: Class) {
    const componentId = this.components.indexOf(componentType);
    if (componentId < 0) throw new Error("Component not found");

    this.componentData[componentId].set(entity, component);
    let componentFlags = this.entityComponents.get(entity) ?? 0;
    componentFlags = componentFlags | (1 << componentId);
    this.entityComponents.set(entity, componentFlags);

    return component;
  }

  query(...components: Class[]) {
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
}
