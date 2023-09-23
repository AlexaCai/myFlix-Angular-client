import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { SynopsisDetailsComponent } from '../synopsis-details/synopsis-details.component';
import { MatDialog } from '@angular/material/dialog';


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
  showDeleteCustomPrompt = false;
  showUpdateCustomPrompt = false;
  showUpdateErrorPrompt = false;


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
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


  //***Use to ensure users cannot select birthday later than the current day.
  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    const selectedDate = d || new Date();
    return selectedDate <= today;
  };
  

  fetchUserInfo(): void {
    if (this.loggedInUsername) {
      this.fetchApiData.getUserInfo(this.loggedInUsername).subscribe((resp: any) => {
        this.userInfo = resp;
        console.log(this.userInfo);
        this.fetchFavoriteMovies(this.userInfo.FavoriteMovies);
      });
    }
  }


  fetchFavoriteMovies(movieIds: string[]): void {
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


  retrieveUsernameFromLocalStorage(): string {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.Username;
    }
    return '';
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


  openUpdateConfirmationDialog(): void {
    this.showUpdateCustomPrompt = true;
  }
  confirmUpdate(): void {
    this.updateAccount();
    this.showUpdateCustomPrompt = false;
  }
  cancelUpdate(): void {
    this.showUpdateCustomPrompt = false;
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
          this.showUpdateErrorPrompt = true;
        }
    )}
  }
  closeUpdateErrorPrompt(): void {
    this.showUpdateErrorPrompt = false;
  }


  openDeleteConfirmationDialog(): void {
    this.showDeleteCustomPrompt = true;
  }
  confirmDelete(): void {
    this.deleteAccount();
    this.showDeleteCustomPrompt = false;
  }
  cancelDelete(): void {
    this.showDeleteCustomPrompt = false;
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
}
