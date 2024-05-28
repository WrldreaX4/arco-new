import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    RouterOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData: any = {};
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  currentPasswordError: string = '';
  newPasswordError: string = '';
  name = 'Angular';
  url: any = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveProfileData();
  }

  retrieveProfileData() {
    this.http
      .get('http://localhost/arco2/arco/api/profile/1')
      .subscribe((resp: any) => {
        console.log(resp);
        this.profileData = resp.data;
      });
  }

  validatePasswords() {
    this.currentPasswordError = '';
    this.newPasswordError = '';

    this.http
      .post('http://localhost/arco2/arco/api/validate-password', {
        currentPassword: this.currentPassword,
      })
      .subscribe(
        (resp: any) => {
          if (!resp.valid) {
            this.currentPasswordError = 'Current password is incorrect.';
          } else if (this.newPassword !== this.confirmNewPassword) {
            this.newPasswordError = 'New passwords do not match.';
          } else {
            this.updatePassword();
          }
        },
        (error) => {
          this.currentPasswordError = 'Error validating current password.';
        }
      );
  }
  updatePassword() {
    const data = {
      username: this.profileData.username,
      email: this.profileData.email,
      password: this.newPassword,
    };

    this.http
      .post(`http://localhost/arco2/arco/ArcoPublicAPI/api/profile/1`, data)
      .subscribe(
        (resp: any) => {
          console.log('Password updated successfully');
        },
        (error) => {
          console.error('Error updating password', error);
        }
      );
  }

  onSelectFile(event: any) {
    console.log('test');
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event?.target?.result;
      };
    }
  }
}
