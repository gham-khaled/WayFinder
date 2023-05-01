import {Injectable} from '@angular/core';
import {Algorithm} from './algorithm.service';
import {PriorityQueue} from "./PriorityQueue";

@Injectable({
  providedIn: 'root'
})
export class DijkstraService extends Algorithm {
  constructor() {
    super();
  }

  async findPath(grid: any[][], start: any, end: any): Promise<any[]> {
    // console.log(` ${grid.map(({ weight }) => (weight))}`)
    const pq = new PriorityQueue((a, b) => a.distance - b.distance);
    pq.push({cell: start, distance: 0, path: []});
    const distances = new Map();
    console.log(grid)
    for (const row of grid) {
      for (const cell of row) {
        distances.set(cell, Number.POSITIVE_INFINITY);
      }
    }
    distances.set(start, 0);

    while (!pq.isEmpty()) {
      const current = pq.pop();
      const currentCell = current.cell;
      const currentPath = current.path;
      const currentDistance = current.distance;
      if (currentCell === end) {
        const finalPath = [...currentPath, currentCell];
        for (const pathCell of finalPath) {
          pathCell.type = 'path';
          await this.delay(100)
        }
        return finalPath;
      }
      if (currentCell.type !== 'start') {
        currentCell.type = 'visited';
        await this.delay(); // Wait for 100 ms for visualization
      }


      const neighbors = this.getNeighbors(grid, currentCell);
      for (const neighbor of neighbors) {
        const newDistance = currentDistance + neighbor.weight;
        if (newDistance < distances.get(neighbor)) {
          distances.set(neighbor, newDistance);
          pq.push({
            cell: neighbor,
            distance: newDistance,
            path: [...currentPath, currentCell],
          });
        }
      }
    }

    return [];
  }
}
