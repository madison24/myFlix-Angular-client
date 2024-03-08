import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  /**
   * Navigation bar for navigating movies
   */
  navMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigation bar for navigating user profile
   */
  navProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out user
   * @return user + token removed from local storage
   * @return user is navigated to welcome page after successful logout
   */

  navLogoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
