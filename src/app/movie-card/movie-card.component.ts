/**
 * @module get-all-movies
 * @remarks
 * This component is the main one of the app and act as the main page. It allows to display all movies from the database once users successfully log in. To do so, it takes the information about each movie, and renders it in the html.
 * 
 * When users are logging in, the component also loads automatically the users' list of favorite to display the correct state of each favorite icon button in the action bar below each movie. This allows to display each movie as already listed in the users' favorite or not upon every connection, depending on the activity of the last session.
 * 
 * This component includes several functions:
 * 
 * -1 function to load all movies from the database upon connection <br>
 * -1 function to load the favorite icon button state and ensure consistency between users session <br>
 * -1 function to retrieve users' information from localStorage (used in other functions) <br>
 * -1 function to add movie to users' list of favorite <br>
 * -1 function to remove movies from users' list of favorite <br>
 * -5 functions to open dialogs based on users interaction on the movie cards: (1) show director info, (2) show genre info, (3) show movie info and (4 & 5) confirmation message after adding/removing movie to/from list of favorite. <br>
 * @returns Movie's all information.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { SynopsisDetailsComponent } from '../synopsis-details/synopsis-details.component';
import { AddFavoriteDetailsComponent } from '../add-favorite-details/add-favorite-details.component';
import { RemoveFavoriteDetailsComponent } from '../remove-favorite-details/remove-favorite-details.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})


export class MovieCardComponent {
  movies: any[] = [];
  loggedInUser: string = '';
  favoriteButtonStates: { [movieId: string]: boolean } = {};


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getMovies();
    this.loadFavoriteButtonStates();
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
      });
      return this.movies;
    });
  }

  /** 
 * Used to display the correct favorite icon state in the action bar below each movie shown when the page is open, depending on if movies have been added to favorite in past sessions or not.
 */
  loadFavoriteButtonStates(): void {
    const loggedInUsername = this.retrieveUsernameFromLocalStorage();
    this.fetchApiData.getUserfavoriteMovies(loggedInUsername).subscribe(
      (resp: any) => {
        resp.forEach((movieId: string) => {
          this.favoriteButtonStates[movieId] = true;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  retrieveUsernameFromLocalStorage(): string {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.Username;
    }
    return '';
  }


  addToFavorite(MovieID: string): void {
    const loggedInUsername = this.retrieveUsernameFromLocalStorage();
    this.fetchApiData.userAddFavoriteMovie(loggedInUsername, MovieID).subscribe(
      (resp: any) => {
        this.favoriteButtonStates[MovieID] = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  removeFromFavorite(MovieID: string): void {
    const loggedInUsername = this.retrieveUsernameFromLocalStorage();
    this.fetchApiData.userDeleteFavoriteMovie(loggedInUsername, MovieID).subscribe(
      (resp: any) => {
        this.favoriteButtonStates[MovieID] = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  openGenreDialogue(genre: any): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: genre.Name,
        Description: genre.Description,
      }
    });
  }


  openDirectorDialogue(director: any): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: director.Name,
        Bio: director.Bio,
        Birth: director.Birth,
        Death: director.Death
      }
    });
  }


  openSynopsisDialogue(Description: any): void {
    this.dialog.open(SynopsisDetailsComponent, {
      data: {
        Description: Description
      }
    });
  }


  openAddToFavoriteDialogue(Title: any): void {
    this.dialog.open(AddFavoriteDetailsComponent, {
      data: {
        Title: Title
      }
    });
  }


  openRemoveFromFavoriteDialogue(Title: any): void {
    this.dialog.open(RemoveFavoriteDetailsComponent, {
      data: {
        Title: Title
      }
    });
  }

}