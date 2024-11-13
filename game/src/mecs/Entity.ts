import { IComponent } from "./Component";

export interface IEntity {
  id: number;
  [component: string]: any;
}

export default class Entity implements IEntity {
  id: number; 
  constructor(id: number) {
    this.id = id;
  }
}
