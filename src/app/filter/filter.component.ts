import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genres } from '../types/Genres';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  showDateDesc: boolean = true;
  showPopularityDesc: boolean = true;
  selectedGenre: string = '';

  @Input() genres: Genres[] = [];
  @Output() sortBy: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchByGenre: EventEmitter<string> = new EventEmitter<string>();

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

  selectGenre(genre: Genres) {
    this.selectedGenre = genre.name;
    this.searchByGenre.emit(genre.id?.toString()); 
  }

}
