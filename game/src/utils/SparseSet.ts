export default class SparseSet {
  #dense: number[] = [];
  #sparse: number[] = [];
  #size: number = 0;

  constructor() {}

  add(x: number) {
    this.#dense[this.#size] = x;
    this.#sparse[x] = this.#size;
    this.#size++;
  }

  remove(x: number) {
    let index = this.#sparse[x];
    if (!index) return;

    let last = this.#dense[this.#size - 1];
    this.#dense[index] = last;
    this.#sparse[last] = index;
    this.#size--;
  }

  has(x: number) {
    return !!this.#sparse[x];
  }

  *[Symbol.iterator]() {
    for (let i in this.#dense) yield i;
  }

  foreach(callback: (x: number) => any) {
    for (let i in this.#dense) callback(i);
  }
}
