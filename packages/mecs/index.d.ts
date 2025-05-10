export class World {
  nextEntity: number;
  entities: Map<string, number>[];
  componentEntities: Map<string, number[]>;
  componentME: Map<string, number>;
  components: string[];
  
  constructor();
  addEntity(): number;
  addComponent(component: string);
  bindEntityComponent(entity: number, _: any, component: string);
  query(...components: string[]): number;
  findEntities(query: number, notQuery: number = 0): number[];
  entityHasComponent(entity: number, component: string): bool;
}
