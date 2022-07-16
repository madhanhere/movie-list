import { Component, EventEmitter, Input ,OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() results: number = 0;
  @Input() totlaPages: number = 0;
  @Input() pageSizeOptions: number[] = [20];
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  listenToPageChange(event: PageEvent) {
    this.pageChange.emit(event.pageIndex);
  }

}
