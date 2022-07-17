import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../types/ApiResponse';
import { Genres } from '../types/Genres';
import { HttpService } from './http.service';
import { Movie } from '../types/Movie';
import { MovieQuery } from '../types/MovieQuery';

@Injectable({
    providedIn: 'root'
})
export class MoviceService {
    constructor(private http: HttpService) {}

    searchMovies(search: string): Observable<ApiResponse<Movie[]>> {
        let searchQuery: string = search.trim();
        searchQuery = searchQuery.replaceAll(" ", "+");
        return this.http.get(`search/movie?query=${searchQuery}`);
    }

    getAllMovies(movieQuery: MovieQuery): Observable<ApiResponse<Movie[]>> {
        let query = `${movieQuery.path}?page=${movieQuery.page}`;
        if (movieQuery.field) {
            query += `&sort_by=${movieQuery.field}`
        }

        if (movieQuery.genre) {
            query +=`&with_genres=${movieQuery.genre}`
        }
        return this.http.get(`${query}`);
    }

    getGenres(): Observable<Genres[]> {
        return this.http.get(`genre/movie/list`).pipe(
            map((data: any) => data?.genres || [])
        );
    }

    sortMovies(sortField: string, page: number = 1): Observable<ApiResponse<Movie[]>> {
        return this.http.get(`discover/movie?sort_by=${sortField}&page=${page}`);
    }
}