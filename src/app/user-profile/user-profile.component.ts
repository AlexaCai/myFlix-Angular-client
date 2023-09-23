import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userInfo: any = {};
  loggedInUsername: any = {};
  favoriteButtonStates: { [movieId: string]: boolean } = {};
  username: string = '';
  password: string = '';
  email: string = '';
  birthday: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
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


  deleteAccount(): void {
    if (this.loggedInUsername) {
      this.fetchApiData.deleteUser(this.loggedInUsername).subscribe(
        () => {
          localStorage.removeItem('User');
          localStorage.removeItem('Token');
          this.router.navigate(['welcome']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateAccount(): void {
    if (this.loggedInUsername) {
      const userData = {
        Username: this.username,
        Password: this.password,
        Email: this.email,
        Birthday: this.birthday
      };
      this.fetchApiData.updateUser(this.loggedInUsername, userData).subscribe(
        (response) => {
          console.log(response); 
          localStorage.removeItem('User');
          localStorage.removeItem('Token');
          this.router.navigate(['welcome']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  

}

