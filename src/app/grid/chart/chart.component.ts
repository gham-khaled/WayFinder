import {Component, Input, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  public chart: any;
  createChart(data:any){
    console.log('Called from Parent')
    this.chart?.destroy();
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: data,
      options: {
        aspectRatio:0.5
      }

    });
  }
}
