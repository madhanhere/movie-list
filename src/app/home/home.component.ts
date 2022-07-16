import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { MoviceService } from '../api/movie.service';
import { ApiResponse } from '../types/ApiResponse';
import { Genres } from '../types/Genres';
import { Movie } from '../types/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  genreResponse: Genres[] = [];
  isSearchInBackground: boolean = false;
  moviePath: string = 'movie/popular';
  movieResponse: ApiResponse<Movie[]> | undefined;
  page: number = 1;
  sortByKey: string = '';
  byGenre: string = '';

  constructor(
    private movieService: MoviceService,
  ) { }

  ngOnInit(): void {
    this.getInitalData();
  }

  pageChange(pageIndex: number) {
    this.page = pageIndex + 1;
    this.getAllMovies();
  }

  getInitalData() {
    this.isSearchInBackground = true;
    try {
      forkJoin([
        this.movieService.getAllMovies(this.moviePath, this.page),
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
    this.movieService.getAllMovies(this.moviePath, this.page, this.sortByKey, this.byGenre).subscribe(
      (response: ApiResponse<Movie[]>) => {
        this.movieResponse = response;
      }
    ), (error: any) => {
      console.log(error);
    }
  }

  searchMovies(search: string) {

    if (!search) {
      this.page = 1;
      this.moviePath = 'movie/popular';
      this.sortByKey = '';
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
    console.log(query);
    this.sortByKey = query;
    this.moviePath = 'discover/movie';
    this.page = 1;
    this.getAllMovies();
  }

  moviesByGenre(genre: string) {
    this.byGenre = genre;
    this.moviePath = 'discover/movie';
    this.page = 1;
    this.getAllMovies();
  }

}
