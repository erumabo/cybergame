export default class World {
  nextEntity: number = 0;
  entities: Map<string, number>[] = [];
  componentEntities: Map<string, number[]> = new Map();
  componentME: Map<string, number> = new Map();
  components: string[] = [];
  
  constructor() {}

  addEntity() {
    this.nextEntity++;
    this.entities[this.nextEntity] = new Map();
    return this.nextEntity;
  }

  addComponent(component: string) {
    this.components.push(component);
    this.componentEntities.set(component, []);
    this.componentME.set(component, 0);
  }

  bindEntityComponent(entity: number, _: Component, component: string) {
    let cent = this.componentEntities.get(component);
    let ent = this.entities[entity];
    
    if(ent.has(component) && cent[ent.get(component)] === entity) return;
    
    let me = this.componentME.get(component);
    cent[me] = entity;
    ent.set(component, me);
    
    this.componentME.set(component, me+1);
  }

  query(...components: string[]) {
    let query: number = 0;
    
    return query;
  }

  findEntities(query: number, notQuery: number = 0) {
    let entities: number[] = [];
    
    return entities;
  }

  getEntityComponent(entity: number, component: string) {
    const componentId = this.components.indexOf(component);
    if (componentId < 0) throw new Error("Component not found");
    return this.componentData[componentId].get(entity);
  }
  
  entityHasComponent(entity: number, component: string) {
    return this.entities[entity].has(component);
  }
}
