import {Injectable} from '@angular/core';
import {DijkstraService} from "./algorithm/dijkstra.service";
import {Algorithm} from "./algorithm/algorithm.service";
import {AStarService} from "./algorithm/a-star.service";
import {GreedyBestFirstService} from "./algorithm/greedy-bf";

@Injectable({
  providedIn: 'root'
})
export class PathfindingService {
  mapToAlgorithm: Map<string, Algorithm>;

  constructor(private dijkstraService: DijkstraService,
              private aStarService: AStarService,
              private greedyBestFirstService: GreedyBestFirstService) {
    this.dijkstraService = dijkstraService;
    this.aStarService = aStarService;
    this.greedyBestFirstService = greedyBestFirstService;
    this.mapToAlgorithm = new Map([
      ['dijkstra', this.dijkstraService],
      ['a-star', this.aStarService],
      ['greedy', this.greedyBestFirstService]])


  }

  async findPath(arr: any[], selectedAlgorithm: string, numRows: number, numCols: number): Promise<any[]> {

    const startCell = this.findStartCell(arr);
    const endCell = this.findEndCell(arr);
    const grid = this.convertTo2DArray(arr, numRows, numCols)
    // @ts-ignore
    return this.mapToAlgorithm.get(selectedAlgorithm).findPath(grid, startCell, endCell)


  }

  findStartCell(grid: any[]): any {
    for (const cell of grid) {
      if (cell.type === 'start') {
        return cell;
      }
    }
    return null;
  }

  findEndCell(grid: any[]): any {
    for (const cell of grid) {
      if (cell.type === 'end') {
        return cell;
      }
    }
    return null;
  }

  convertTo2DArray(arr: any[], numRows: number, numCols: number): any[][] {
    const grid = new Array(numRows);

    for (let row = 0; row < numRows; row++) {
      grid[row] = new Array(numCols);
      for (let col = 0; col < numCols; col++) {
        grid[row][col] = arr[row * numRows + col];
      }
      console.log(grid[row])
    }

    return grid;
  }


}
