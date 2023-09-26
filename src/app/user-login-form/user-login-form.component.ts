/**
 * @module user-login
 * @remarks
 * This component allows users to log in into the app via a dialog prompt (when 'log in' button on the welcome page is clicked by users).
 * @example  
 * In the TypeScript file, the following input information entered by users in the html log in form is used to process the login logic using the loginUser function.
 * 
 * Username
 * Password
 * 
 * Upon successful log in, a confirmation dialog appears in the users' UI, and the users are redirected to the app initial page (see get-all-movie section (movie-card.component.html)). If the log in failed, a dialog appears to let users know.
 * @param - Username = user's username <br>
 * Password = user's password
 * @returns Automatic redirection to the app initial and main page where all movies are displayed.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      const { user, token } = response;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      this.router.navigate(['movies']);
      this.dialogRef.close(); 
      this.snackBar.open('User logged in sucessfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}