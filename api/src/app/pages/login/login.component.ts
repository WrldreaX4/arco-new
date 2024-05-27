import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password = '';
  errorMessage: string = ''; // To store error message
  
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {

    this.authService.userLogin(this.email, this.password).subscribe(
      data=>{
        console.log('Login Successfull.', data);
        this.router.navigate(['/app/dashboard'])
      }
    )

    }
    /*if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }
    
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.userLogin(data).subscribe(
      (response: any) => {
        console.log(response.message);
        this.authService.setToken(response.jwt);
        this.router.navigate(['/app/dashboard']);
      },
      (error: any) => {
        if (error.status === 401) {
          alert('Email or Password is Incorrect.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );*/
  }