import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { SynopsisDetailsComponent } from '../synopsis-details/synopsis-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  loggedInUser: string = '';

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
      console.log(this.movies);
      return this.movies;
    });
  }

  favoriteButtonState: boolean = false;

  retrieveUsernameFromLocalStorage(): string {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.Username;
    }
    return '';
  }
  addToFavorite(Username: string, MovieID: string): void {
    const loggedInUsername = this.retrieveUsernameFromLocalStorage();
    this.fetchApiData.userAddFavoriteMovie(loggedInUsername, MovieID).subscribe((resp: any) => {
      console.log(resp);
    });
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


}