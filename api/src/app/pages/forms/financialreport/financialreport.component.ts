import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-financialreport',
  standalone: true,
  imports: [NavbarComponent, NgIf, ReactiveFormsModule],
  templateUrl: './financialreport.component.html',
  styleUrl: './financialreport.component.css'
})
export class FinancialreportComponent {
  userId: number | null = null;
  financialReportForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private authService: AuthService) {
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
    if (this.financialReportForm.valid) {
      const reportData = this.financialReportForm.value; 

      if (this.userId !== null) {
        const endpoint = `http://localhost/arco2/arco/api/financialreport/${this.userId}`;
        
      
        this.http.post(endpoint, reportData)
          .subscribe(
            (resp) => {
              console.log('Report submitted:', resp);

              this.router.navigate(['create/financialreport/view']);
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