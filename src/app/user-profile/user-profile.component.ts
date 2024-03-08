import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  user: any = {};

  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * local storage will give username + token and send request to api for users info
   * User profile will display users favorite movies along with name, birthday, etc.
   * @return user's data
   */

  // Gets users info
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((data: any) => {
      this.user = data;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC-5'
      );

      this.fetchApiData.getAllMovies().subscribe((result: any) => {
        this.FavoriteMovies = result.filter(
          (movie: { _id: any }) =>
            this.user.FavoriteMovies.indexOf(movie._id) >= 0
        );
      });
    });
  }

  /**
   * Update users data
   * @return user data
   * @return user updated data thats saved to local storage
   * @return notification of successful update
   * @return or notification of error
   */

  // update users profile
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (data: any) => {
        console.log('successfully updated', data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        console.log(data);
        this.snackBar.open('Profile has been successfully updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        console.error('Error updating user:', result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * @return confirm delete profile prompt
   * @return user's profile has been deleted
   * @return navigates to welcome page
   * @return notifies user of success or error
   * @return user details and token removed from local storage
   */

  // delete user profile
  deleteUserProfile(): void {
    if (confirm('Do you want to delete your profile permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your profile has been deleted', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
        console.log(result);
      });
    }
  }
}
