import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridComponent } from './app/grid/grid.component';
import { CellComponent } from './app/grid/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
