import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  showDateDesc: boolean = true;
  showPopularityDesc: boolean = true;

  @Output() sortBy: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sortDate() {
    this.showDateDesc = !this.showDateDesc;
    
    if (this.showDateDesc) {
      this.sortBy.emit('release_date.desc');
    } else {
      this.sortBy.emit('release_date.asc');
    }
  }

  sortByPopularity() {
    this.showPopularityDesc = !this.showPopularityDesc;

    if (this.showDateDesc) {
      this.sortBy.emit('popularity.desc');
    } else {
      this.sortBy.emit('popularity.asc');
    }
  }

}
