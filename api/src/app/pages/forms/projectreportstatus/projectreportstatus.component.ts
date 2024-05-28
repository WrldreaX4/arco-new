import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-projectreportstatus',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './projectreportstatus.component.html',
  styleUrl: './projectreportstatus.component.css'
})
export class ProjectReportStatusComponent implements OnInit {
  projectStatusReport: FormGroup;
  userId: number | null = null;

  @ViewChild('formContent')
  formContent!: ElementRef;
  datePipe: any;
  

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.projectStatusReport = this.fb.group({
      projectName: ['', Validators.required],
      projectManager: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      statusDesc: ['', Validators.required],
      overallProgress: ['', Validators.required],
      milestoneDesc: ['', Validators.required],
      compeDate: ['', Validators.required],
      taskDesc: ['', Validators.required],
      stat: ['', Validators.required],
      issuesName: ['', Validators.required],
      issuesPrio: ['', Validators.required]
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
    if (this.projectStatusReport.valid) {
      const reportData = this.projectStatusReport.value;
      this.http.post(`http://localhost/arco2/arco/api/projectreport/${this.userId}`, reportData)
        .subscribe(
          (resp: any) => {
            console.log('Project Status Report submitted:', resp);
            this.router.navigate(['create/projectreportstatus/view']);
          },
          (error: any) => {
            console.error('Error submitting project status report:', error);
          }
        );
    } else {
      console.warn('Form is not valid. Please check required fields.');
    }
  }
}