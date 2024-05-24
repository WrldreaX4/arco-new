import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-eventform',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, NgIf],
  templateUrl: './eventform.component.html',
  styleUrl: './eventform.component.css'
})
export class EventformComponent implements OnInit {
  eventForm: FormGroup;

  ngOnInit(): void {
    
  }

  constructor(private http: HttpClient, private router: Router){
    this.eventForm = new FormGroup({
      event_name: new FormControl('', Validators.required),
      event_date: new FormControl(''),
      event_title: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      expected_participants: new FormControl('', Validators.required),
      total_participants: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required)
    })
  }

  submitAndNavigate() {
    if (this.eventForm.valid) {
      const reportData = this.eventForm.value; // Use annualForm to extract values

      // Post data to the specified endpoint
      this.http.post('http://localhost/arco2/arco/api/eventreport/2', reportData)
        .subscribe(
          (resp) => {
            console.log('Report submitted:', resp);
            this.router.navigate(['create/eventreport/uploadmedia']);
            // Navigate to the collage creation route upon succes
            
          },
          (error) => {
            console.error('Error Submitting Report', error); // Handle errors
          }
        );
    } else {
      console.warn('Form is not valid. Check required fields.');
    }
  }

}