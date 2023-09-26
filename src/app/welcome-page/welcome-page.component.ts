/**
 * @module welcome-page
 * @remarks
 * This component is the landing page for all users that are not logged in. It has two buttons: log in and sign up.
 * 
 * When users click on log in, the openUserLoginDialog function is called, and opens a log in prompt dialog (defined in <strong>user-login</strong> section (<strong>user-login-form.component.ts)</strong>). Users can then enter their username and password to log in. 
 * 
 * When users click on sign up, the openUserRegistrationDialog function is called, and opens a sign up prompt dialog (defined in <strong>user-registration</strong> section (<strong>user-registration-form.component.ts)</strong>). Users can then enter their username, password, email and birthday (optional) to sign up.
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}