import {Component, OnInit} from '@angular/core';
import {PathfindingService} from '../pathfinding.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  grid: any[] = [];
  currentMode: 'start' | 'end' | 'obstacle' | null = null;
  startCell: any;
  endCell: any;
  numRows = 10;
  numCols = 10;
  algorithms: string[] = ['dijkstra', 'greedy', 'a-star']
  numColsBR = this.numCols
  selectedAlgorithm = 'dijkstra';

  constructor(private pathfindingService: PathfindingService) {

  }

  ngOnInit(): void {
    this.initGrid();
  }

  refreshGrid() {
    for (const cell of this.grid) {
      cell.type = cell.type === 'visited' || cell.type === 'path' ? 'unvisited' : cell.type
    }
  }

  initGrid(random = false): void {
    this.grid = [];
    this.numColsBR = this.numCols

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const cell = {
          row: row,
          col: col,
          type: 'unvisited',
          weight: random ? this.randomIntFromInterval(1, 100) : 1,
        };
        this.grid.push(cell);
      }
    }
    this.startCell = this.grid[0]
    this.startCell.type = 'start'
    this.endCell = this.grid[this.grid.length - 1]
    this.endCell.type = 'end'
  }

  onCellClick(cell: any): void {
    if (this.currentMode === 'start') {
      if (this.startCell) {
        this.startCell.type = 'unvisited';
      }
      cell.type = 'start';
      this.startCell = cell;
    } else if (this.currentMode === 'end') {
      if (this.endCell) {
        this.endCell.type = 'unvisited';
      }
      cell.type = 'end';
      this.endCell = cell;
    } else if (this.currentMode === 'obstacle') {
      cell.type = cell.type === 'unvisited' ? 'obstacle' : 'unvisited';
      // console.log(cell.type)
    } else {
      const weight = prompt('Enter the weight of the cell (default is 1):', '1');
      cell.weight = weight ? parseInt(weight) : 1;
    }
  }

  toggleMode(mode: 'start' | 'end' | 'obstacle'): void {
    this.currentMode = this.currentMode === mode ? null : mode;
    // console.log(this.currentMode)
  }

  async compare(): Promise<void> {
    for (const algorithm of this.algorithms) {
      console.log(algorithm)
      const path = await this.pathfindingService.findPath(this.grid, algorithm, this.numRows, this.numCols);
      let sum = 0;
      path.forEach((cell) => {
        sum += cell.weight;
      });
      console.log(`For ${algorithm} we have a total of ${sum}`)
      this.refreshGrid()
    }
  }

  async visualize() {
    await this.pathfindingService.findPath(this.grid, this.selectedAlgorithm, this.numRows, this.numCols);
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
