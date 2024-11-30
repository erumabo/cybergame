export default class UnitStats {
  salud: number;
  energia: number;
  
  constructor(salud = 0, energia = 0) {
    this.salud = salud;
    this.energia = energia;
  }
}