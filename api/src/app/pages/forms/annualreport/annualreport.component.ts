import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-annualreport',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NavbarComponent],
  templateUrl: './annualreport.component.html',
  styleUrl: './annualreport.component.css'
})
export class AnnualreportComponent implements OnInit {
  annualForm: FormGroup;
    constructor(private http: HttpClient, private router: Router){
      this.annualForm = new FormGroup({
        title: new FormControl('', Validators.required), // Required field
        year: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2100)]), // Number validation
        executive_summary: new FormControl('', Validators.required), // Required field
        company_achievements: new FormControl('', Validators.required), // Required field
        financial_statements: new FormControl(''), // Optional
        management_discussion: new FormControl(''), // Optional
        future_outlook: new FormControl('') // Optional
      });
    }

    ngOnInit(): void {
      
    }

    submitAndNavigate() {
      if (this.annualForm.valid) {
        const reportData = this.annualForm.value; // Use annualForm to extract values

        // Post data to the specified endpoint
        this.http.post('http://localhost/arco2/arco/api/annualreport/2', reportData)
          .subscribe(
            (resp) => {
              console.log('Report submitted:', resp);
              // Navigate to the collage creation route upon success
              this.router.navigate(['create/annualreport/view']);
              
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

