import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userInfo: any = {};
  loggedInUsername: any = {};
  favoriteButtonStates: { [movieId: string]: boolean } = {};


  constructor(
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.loggedInUsername = user.Username;
      console.log(this.loggedInUsername);
      if (this.loggedInUsername) {
        this.fetchUserInfo();
      }
    }
  }

  fetchUserInfo(): void {
    if (this.loggedInUsername) {
      this.fetchApiData.getUserInfo(this.loggedInUsername).subscribe((resp: any) => {
        this.userInfo = resp;
        console.log(this.userInfo);
        // Fetch favorite movies directly from the API based on movie titles
        this.fetchFavoriteMovies(this.userInfo.FavoriteMovies);
      });
    }
  }

  fetchFavoriteMovies(movieIds: string[]): void {
    // Fetch all movies
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      const favoriteMovies: any[] = [];
      movies.forEach((movie) => {
        if (movieIds.includes(movie._id)) {
          favoriteMovies.push(movie);
        }
      });
      this.userInfo.FavoriteMovies = favoriteMovies;
    });
  }
  

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

  removeFromFavorite(MovieID: string): void {
    const loggedInUsername = this.retrieveUsernameFromLocalStorage();
    this.fetchApiData.userDeleteFavoriteMovie(loggedInUsername, MovieID).subscribe(
      (resp: any) => {
        console.log(resp);
        const updatedMovieIds = this.userInfo.FavoriteMovies
          .filter((movie: any) => movie._id !== MovieID)
          .map((movie: any) => movie._id);
          this.fetchFavoriteMovies(updatedMovieIds);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}


