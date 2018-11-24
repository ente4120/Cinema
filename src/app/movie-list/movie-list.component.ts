import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Movie} from '../movie';
import {MoviesService} from '../movies.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-movie-list',
  templateUrl: '/movie-list.component.html',
  styleUrls: ['/movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  private moviesSub: Subscription;
  selectedMovie: Movie = {  imdbID: '', Title: '', Year: 2018, Runtime: '', Genre: '', Director: '', Poster: ''};
  newMovie: Movie = {  imdbID: '', Title: '', Year: 2018, Runtime: '', Genre: '', Director: '', Poster: 'N/A'};
  checkTitleVal = true;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies();
    this.moviesService.getMovies();
    this. moviesSub = this.moviesService.getMoviesUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.selectedMovie.imdbID);
  }

  updateMovie() {
    if (this.checkTitleVal) {
      console.log(this.selectedMovie.Title);
      this.moviesService.updateMovie(this.selectedMovie);
    }
  }

  copyMovie(movie: Movie) {
      this.selectedMovie.imdbID = movie.imdbID;
      this.selectedMovie.Title = movie.Title;
      this.selectedMovie.Year = movie.Year;
      this.selectedMovie.Runtime = movie.Runtime;
      this.selectedMovie.Genre = movie.Genre;
      this.selectedMovie.Director = movie.Director;
  }

  checkTitle() {
    this.checkTitleVal = true;
    this.movies.forEach(element => {
      if (element.Title.toUpperCase() === this.selectedMovie.Title.toUpperCase()) {
        this.checkTitleVal = false;
        return;
      }
    });
  }

  addNewMovie() {
    this.movies.push(this.newMovie);
    this.moviesService.addNewMovie(this.newMovie);
  }
}
