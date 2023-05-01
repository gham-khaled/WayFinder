import { Injectable } from '@angular/core';
import {Cell} from "./Cell";

@Injectable({
  providedIn: 'root'
})
export abstract class Algorithm {
  constructor() {}
  defaultSpeed: number = 10;
  // @ts-ignore
  abstract async findPath(grid: any[][], start: any, end: any): Promise<any[]>;

  getNeighbors(grid: any[][], cell: any): any[] {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const row = cell.row;
    const col = cell.col;
    const neighbors = [];

    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }
    if (row < numRows - 1) {
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
      neighbors.push(grid[row][col - 1]);
    }
    if (col < numCols - 1) {
      neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter(neighbor => neighbor.type !== 'obstacle');
  }

  delay(ms: number=this.defaultSpeed): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async setPath(finalPath: Cell[]){
    for (const pathCell of finalPath) {
      pathCell.type = pathCell.type === 'visited' ? 'path':  pathCell.type;
      await this.delay()
    }
  }

}
