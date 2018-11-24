import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Movie} from './movie';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();
  private pageLoaded = 1;

  constructor(private http: HttpClient) { }

  getMovies() {
     this.http
     .get('http://www.omdbapi.com/?s=super&type=movie&apikey=994bc2b9&page=' + (this.pageLoaded++))
     .subscribe(data => {
      let tempMoviesList: Movie[] = [];
      tempMoviesList = (<any>data).Search;
      tempMoviesList.forEach(element => {
        this.getMovieDetails(element.imdbID);
      });
     this.moviesUpdated.next([...this.movies]);
     });
  }

  getMovieDetails(id: string) {
    this.http
    .get('http://www.omdbapi.com/?i=' + id + '&apikey=994bc2b9')
    .subscribe(data => {
      this.movies.push(<Movie>data);
     this.moviesUpdated.next([...this.movies]);
    });
 }

  getMoviesUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  deleteMovie(movieId: string) {
        const updatedMovies = this.movies.filter(movie => movie.imdbID !== movieId);
        this.movies = updatedMovies;
        this.moviesUpdated.next([...this.movies]);
  }

  updateMovie(movie: Movie) {
    this.movies.forEach(element => {
      if (element.imdbID = movie.imdbID) {
        element.Title = movie.Title;
        element.Year = movie.Year;
        element.Runtime = movie.Runtime;
        element.Genre = movie.Genre;
        element.Director = movie.Director;
      }
    });
  }

  addNewMovie(movie: Movie) {
    this.movies.push(movie);
  }
}
