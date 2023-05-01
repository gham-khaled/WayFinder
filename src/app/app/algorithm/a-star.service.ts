import {Injectable} from '@angular/core';
import {Algorithm} from './algorithm.service';
import {PriorityQueue} from "./PriorityQueue";
import {Cell} from "./Cell";

@Injectable({
  providedIn: 'root'
})
export class AStarService extends Algorithm {
  constructor() {
    super();
  }

  async findPath(grid: any[][], start: any, end: any): Promise<any[]> {
    const openSet: Cell[] = [];
    const closedSet: Cell[] = [];
    const cameFrom: Map<Cell, Cell | null> = new Map();

    start.g = 0;
    start.f = start.h = this.heuristic(start, end);
    openSet.push(start);

    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
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
        await this.setPath(path.reverse())

        return path.reverse();
      }
      current.type = current.type === 'unvisited'? 'visited': current.type

      closedSet.push(current);

      const neighbors = this.getNeighbors(grid, current);

      for (const neighbor of neighbors) {
        if (!closedSet.includes(neighbor)) {
          const tentativeG = current.g + neighbor.weight;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (tentativeG >= neighbor.g) {
            continue;
          }

          cameFrom.set(neighbor, current);
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          // neighbor.type = 'visited';
          await this.delay();
        }
      }
    }

    return [];
  }

  heuristic(a: Cell, b: Cell): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }
}
