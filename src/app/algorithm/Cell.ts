export class Cell {
  row: number;
  col: number;
  type: 'start' | 'end' | 'obstacle' | 'visited' | 'unvisited' | 'path';
  weight: number;
  f: number;
  g: number;
  h: number;

  constructor(
    row: number,
    col: number,
    type: 'start' | 'end' | 'obstacle' | 'visited' | 'unvisited' | 'path',
    weight: number = 1
  ) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.weight = weight;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}
