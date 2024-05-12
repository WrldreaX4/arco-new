import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-financialreport',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './financialreport.component.html',
  styleUrl: './financialreport.component.css'
})
export class FinancialreportComponent {
  financialReportForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.financialReportForm = this.fb.group({
      report_title: ['', Validators.required],
      prepared_by: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      executive_summary: ['', Validators.required],
      income1: ['', Validators.required],
      income_salary1: ['', Validators.required],
      income2: [''],
      income_salary2: [''],
      expense_item1: ['', Validators.required],
      expense_amount1: ['', Validators.required],
      expense_item2: [''],
      expense_amount2: [''],
      expense_item3: [''],
      expense_amount3: ['']
    });
  }
  ngOnInit(): void {
  
  }
  
  submitAndNavigate() {
    if (this.financialReportForm.valid) {
      const reportData = this.financialReportForm.value; // Use annualForm to extract values

      // Post data to the specified endpoint
      this.http.post('http://localhost/arco2/arco/api/financialreport/2', reportData)
        .subscribe(
          (resp) => {
            console.log('Report submitted:', resp);
            // Navigate to the collage creation route upon success
            this.router.navigate(['create/financialreport/view']);
            
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