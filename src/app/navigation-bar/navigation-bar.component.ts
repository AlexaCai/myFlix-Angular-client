/**
 * @module navigation-bar
 * @remarks
 * This component is the navigation tool for the app. It displays three possible actions to users:
 * 
 * -Go to home (home can also be accessed by clicking on the myFlix icon on the left side of the navigation bar) <br>
 * -Go to profile <br>
 * -Log out <br>
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(
    public router: Router
  ) { }


  Logout(): void {
    localStorage.removeItem('User');
    this.router.navigate(['welcome']);
  }

  userProfilePage(): void {
    this.router.navigate(['user-profile']);
  }

  moviesPage(): void {
    this.router.navigate(['movies']);
  }

}
