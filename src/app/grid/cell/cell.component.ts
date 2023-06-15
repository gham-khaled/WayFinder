import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() cellData: any;
  @Output() click = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    // this.click.emit(this.cellData);
  }
}
