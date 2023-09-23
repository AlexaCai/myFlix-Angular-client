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
