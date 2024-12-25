export default class UnitModel {
  /** Buissness logic props **/
  /** consider making a proxy for this **/
  skills = [];

  constructor() {
  }

  /* Lifecycle */
  update(dt: number) {
  }
  
  activate() {
  }
  
  onDamage() {
  }

  /*
  target(map, t) {
    for (let skill of this.skills) {
      if (skill.use(t, map)) break;
    }
  }*/
}