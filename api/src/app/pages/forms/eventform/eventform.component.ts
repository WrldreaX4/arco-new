import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-eventform',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, NgIf],
  templateUrl: './eventform.component.html',
  styleUrl: './eventform.component.css'
})
export class EventformComponent implements OnInit {
  eventForm: FormGroup;
  userId: number | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.eventForm = new FormGroup({
      event_name: new FormControl('', Validators.required),
      event_date: new FormControl(''),
      event_title: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      expected_participants: new FormControl('', Validators.required),
      total_participants: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        console.log('User ID:', this.userId);
      } else {
        console.log('No user logged in.');
      }
    });
  }
  submitAndNavigate() {
    if (this.eventForm.valid) {
      const reportData = this.eventForm.value; 

      if (this.userId !== null) {
        const endpoint = `http://localhost/arco2/arco/api/eventreport/${this.userId}`;
        

        this.http.post(endpoint, reportData)
          .subscribe(
            (resp) => {
              console.log('Report submitted:', resp);
              this.router.navigate(['create/eventreport/uploadmedia']);

            },
            (error) => {
              console.error('Error Submitting Report', error); 
            }
          );
      } else {
        console.error('User ID is not set.');
      }
    } else {
      console.warn('Form is not valid. Check required fields.');
    }
  }
}