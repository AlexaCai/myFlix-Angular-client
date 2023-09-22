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
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        this.favoriteButtonStates[movie._id] = false;
      });
      console.log(this.movies);
      return this.movies;
    });
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
        console.log(resp);
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
        console.log(resp);
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