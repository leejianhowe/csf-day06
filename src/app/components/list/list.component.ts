import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../item.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() list: Item[] = []
  @Output() itemId = new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {
  }
  passId(id:string) {
    this.itemId.emit(id)
  }
}
