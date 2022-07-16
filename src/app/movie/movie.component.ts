import { Component, Input, OnInit } from '@angular/core';
import { Genres } from '../types/Genres';
import { Movie } from '../types/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie | undefined;
  @Input() genres: Genres[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
