import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell/cell.component';
import { ChartComponent } from './grid/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
