import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { SynopsisDetailsComponent } from '../synopsis-details/synopsis-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


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
  showUpdateErrorPrompt1 = false;
  showUpdateErrorPrompt2 = false;
  updateErrorMessage: string = '';
  columnNum: number = 4;
  isMediumOrLarger: boolean = false;


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver
  ) { }


  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.loggedInUsername = user.Username;
      if (this.loggedInUsername) {
        this.fetchUserInfo();
      }
    }

    //***This is use to set up responsiveness of the profile page based on screen size.
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((state) => {
        if (state.matches) {
          if (state.breakpoints[Breakpoints.XSmall]) {
            this.columnNum = 1; // For XSmall screens, 1 column
          } else if (state.breakpoints[Breakpoints.Small]) {
            this.columnNum = 1; // For Small screens, 2 columns
          } else if (state.breakpoints[Breakpoints.Medium]) {
            this.columnNum = 3; // For Medium screens, 4 columns
          } else {
            this.columnNum = 3;
          }
        }
      });

    //***This is use to set up responsiveness of the profile page based on screen size.
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(
        map((result: { matches: boolean }) => result.matches)
      )
      .subscribe((matches) => {
        this.isMediumOrLarger = matches;
        this.columnNum = matches ? 4 : 1;
      });

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
          localStorage.removeItem('User');
          localStorage.removeItem('Token');
          this.router.navigate(['welcome']);
        },
        (error) => {
          console.error(error);
          console.log(error.message);
          if (error.status === 422) {
            this.showUpdateErrorPrompt1 = true;
          } else if (error.status === 409) {
            this.showUpdateErrorPrompt2 = true;
            this.updateErrorMessage = error.message;
          }
        }
      );
    }
  }
  closeUpdateErrorPrompt(): void {
    this.showUpdateErrorPrompt1 = false;
    this.showUpdateErrorPrompt2 = false;
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

