import {Component, OnInit, ViewChild} from '@angular/core';
import {PathfindingService} from '../pathfinding.service';
import {ChartComponent} from "./chart/chart.component";

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
  comparable: boolean = false
  algoTotalWeight: number[] = [];
  algoCellsVisited: number[] = [];
  @ViewChild(ChartComponent)
  chart!: ChartComponent;

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
          type: random ? this.randomObstacle() : 'unvisited',
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

  async triggerChart(): Promise<void> {
    this.algoTotalWeight = []
    this.algoCellsVisited = []
    await this.compare()
    const data = {// values on X-Axis
      labels: this.algorithms,
      datasets: [
        {
          label: "Cells Visited",
          data: this.algoCellsVisited,
          backgroundColor: 'blue'
        },
        {
          label: "Total Weight",
          data: this.algoTotalWeight,
          backgroundColor: 'limegreen'
        }
      ]
    }
    this.chart?.createChart(data)
  }

  async compare(): Promise<void> {
    for (const algorithm of this.algorithms) {
      console.log(algorithm)
      const path = await this.pathfindingService.findPath(this.grid, algorithm, this.numRows, this.numCols);
      let totalWeight = 0;
      let numOfCells = 0;
      path.forEach((cell) => {
        totalWeight += cell.weight;
      });
      for (const cell of this.grid) {
        if (cell.type !== 'unvisited'){
          numOfCells ++;
        }
      }
      console.log(`For ${algorithm} we have a total of ${totalWeight} with ${numOfCells} cells visited`)
      this.algoTotalWeight.push(totalWeight)
      this.algoCellsVisited.push(numOfCells)
      this.refreshGrid()
    }
  }

  async visualize() {
    this.refreshGrid()
    const path = await this.pathfindingService.findPath(this.grid, this.selectedAlgorithm, this.numRows, this.numCols);
    let totalWeight = 0;
    let numOfCells = 0;
    path.forEach((cell) => {
      totalWeight += cell.weight;
    });
    for (const cell of this.grid) {
      if (cell.type !== 'unvisited'){
        numOfCells ++;
      }
    }
    console.log(`For ${this.selectedAlgorithm} we have a total of ${totalWeight} with ${numOfCells} cells visited`)
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  randomObstacle(): 'unvisited' | 'obstacle' {
    return  this.randomIntFromInterval(1, 9) > 1  ? 'unvisited' : 'obstacle'
  }
}
