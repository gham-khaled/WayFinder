import { Injectable } from '@angular/core';
import { Algorithm } from './algorithm.service';
import {PriorityQueue} from "./PriorityQueue";
import {Cell} from "./Cell";

@Injectable({
  providedIn: 'root'
})
export class GreedyBestFirstService extends Algorithm {
  constructor() {
    super();
  }

  async findPath(grid: any[][], start: any, end:any): Promise<any[]> {
    const openSet: Cell[] = [];
    const closedSet: Cell[] = [];
    const cameFrom: Map<Cell, Cell | null> = new Map();
    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].h < openSet[lowestIndex].h) {
          lowestIndex = i;
        }
      }

      const current = openSet.splice(lowestIndex, 1)[0];

      if (current.type === 'end') {
        const path: Cell[] = [];
        let temp: Cell | null = current;
        while (temp) {
          path.push(temp);
          temp = cameFrom.get(temp) || null;
        }
        return path.reverse();
      }

      closedSet.push(current);

      const neighbors = this.getNeighbors(grid, current);

      for (const neighbor of neighbors) {
        if (!closedSet.includes(neighbor)) {
          neighbor.h = this.heuristic(neighbor, end);

          if (!openSet.includes(neighbor)) {
            cameFrom.set(neighbor, current);
            neighbor.type = 'visited';
            await this.delay();
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  }
  heuristic(a: Cell, b: Cell): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

}
