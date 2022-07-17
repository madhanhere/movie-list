import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { MoviceService } from '../api/movie.service';
import { ApiResponse } from '../types/ApiResponse';
import { Genres } from '../types/Genres';
import { Movie } from '../types/Movie';
import { MovieQuery } from '../types/MovieQuery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  genreResponse: Genres[] = [];
  isSearchInBackground: boolean = false;
  movieResponse: ApiResponse<Movie[]> | undefined;
  movieQuery: MovieQuery = {
    field: '',
    genre: '',
    page: 1,
    path: 'movie/popular'
  };

  constructor(
    private movieService: MoviceService,
  ) { }

  ngOnInit(): void {
    this.getInitalData();
  }

  pageChange(pageIndex: number) {
    this.movieQuery.page = pageIndex + 1;
    this.getAllMovies();
  }

  getInitalData() {
    this.isSearchInBackground = true;
    try {
      forkJoin([
        this.movieService.getAllMovies(this.movieQuery),
        this.movieService.getGenres(),
      ]).subscribe(([moviesResponse, genreResponse]) => {
        this.isSearchInBackground = false;
        this.movieResponse = moviesResponse;
        this.genreResponse = genreResponse;
      });
    } catch (error: any) {
      this.isSearchInBackground = false;
      console.log(error?.message);
    }
  }

  getAllMovies() {
    this.movieService.getAllMovies(this.movieQuery).subscribe(
      (response: ApiResponse<Movie[]>) => {
        this.movieResponse = response;
      }
    ), (error: any) => {
      console.log(error);
    }
  }

  searchMovies(search: string) {
    if (!search) {
      this.movieQuery.page = 1;
      this.movieQuery.path = 'movie/popular';
      this.movieQuery.field = '';
      this.getAllMovies();
      return;
    }

    this.movieService.searchMovies(search).subscribe((apiResponse: ApiResponse<Movie[]>) => {
      this.movieResponse = apiResponse;
    }, (err) => {
      this.movieResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0
      }
    });
  }

  sortBy(query: string) {
    this.movieQuery.field = query;
    this.movieQuery.path = 'discover/movie';
    this.movieQuery.page = 1;
    this.getAllMovies();
  }

  moviesByGenre(genre: string) {
    this.movieQuery.genre = genre;
    this.movieQuery.path = 'discover/movie';
    this.movieQuery.page = 1;
    this.getAllMovies();
  }

  reset() {
    this.movieQuery.path = 'movie/popular';
    this.movieQuery.page = 1;
    this.movieQuery.genre = '';
    this.movieQuery.field = '';
    this.getAllMovies();
  }

}
