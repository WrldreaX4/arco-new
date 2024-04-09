import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.userSignUp(data).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
}