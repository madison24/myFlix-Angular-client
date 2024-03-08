import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @description component of movie card
 * @selector 'app-movie-card'
 * @templateURL './movie-card.component.html'
 * @styleUrls './movie-card.component.scss'
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  userData = { Username: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];

  /**
   * @constructor constructor for MovieCardComponent
   * @param {MatDialog} dialog material dialog service for opening dialogs
   * @param {MatSnackBar} snackbar material snack bar service for displaying notifications/alerts
   * @param {FetchApiDataService} fetchApiData service for fetching data from the API used
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Function for getting all movies
   * @returns all movies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function will open director dialog when button is clicked
   * @param {string} name director's name
   * @param {string} bio director's biography
   * @param {string} birth director's birth date
   * @param {string} death director's death date
   * @returns director info : name, bio, birth and death date
   */

  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      width: '450px',
    });
  }
  /**
   * Function will open genre dialog when button is clicked
   * @param {string} name genre name
   * @param {string} description genre description
   * @returns genre name and description
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }
  /**
   * Function will open movie details dialog when button is clicked
   * @param {string} description movie description
   * @returns movie description
   */

  openMovieDetailsDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }
  /**
   * Function will get list of FavoriteMovies
   * @returns user's favorite movies
   */

  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Favorite Movies in getFavoriteMovies', this.FavoriteMovies);
  }

  /**
   * Function to check if a movie is a favorite
   * @param movie check movie object
   * @returns {boolean} boolean stating whether movie is in the favorites list
   */

  isFave(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

  /**
   * Function add or delete movie from favorites by clicking favorite icon button
   * @param {any} movie movie to toggle favorite with icon
   */

  // toggleFavorite(movie: any): void {
  //   const isFavorite = this.isFave(movie);
  //   isFavorite ? this.deleteFaveMovies(movie) : this.addFaveMovies(movie);
  // }

  /**
   * Function add movie to FavoriteMovies list
   * @param {any} movie movie to add to favorites
   * @return message saying "Movie added to your favorites"
   */

  addFaveMovies(id: string): void {
    if (this.isFave(id)) {
      this.deleteFaveMovies(id);
    } else {
      this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
        this.snackBar.open('Movie added to your favorites', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies();
      });
    }
  }
  /**
   * Function delete movie from FavoriteMovies list
   * @param {any} movie movie to delete from favorites
   * @return message saying "Movie deleted from your favorites"
   */

  deleteFaveMovies(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe(() => {
      this.snackBar.open('Movie deleted from your favorites', 'OK', {
        duration: 2000,
      });
    });
  }
}
