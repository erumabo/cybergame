export class World {
  #nextEntity = 0; // entity identity
  entities = []; // sparse array of map component <> backref to dense array
  componentEntities = new Map(); // map component <> dense array
  componentME = new Map(); // map component <> max index in dense array
  
  constructor() {}

  addEntity() {
    this.#nextEntity++;
    this.entities[this.#nextEntity] = new Map();
    return this.#nextEntity;
  }

  addComponent(component) {
    this.componentEntities.set(component, []);
    this.componentME.set(component, 0);
  }

  bindEntityComponent(entity, _, component) {
    let cent = this.componentEntities.get(component);
    let ent = this.entities[entity];
    
    if(ent.has(component) && cent[ent.get(component)] === entity) return;
    
    let me = this.componentME.get(component);
    cent[me] = entity;
    ent.set(component, me);
    
    this.componentME.set(component, me+1);
  }

  query(...components) {
    let query = 0;
    
    return query;
  }

  findEntities(query, notQuery = 0) {
    let entities = [];
    
    return entities;
  }
  
  entityHasComponent(entity, component) {
    return this.entities[entity].has(component);
  }
}
