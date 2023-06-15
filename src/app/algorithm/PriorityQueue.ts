export class PriorityQueue {
  items: any[];
  compare: (a: any, b: any) => number;

  constructor(compare: (a: any, b: any) => number) {
    this.items = [];
    this.compare = compare;
  }

  push(item: any): void {
    this.items.push(item);
    this.items.sort(this.compare);
  }

  pop(): any {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
