import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editprojectreport',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, NgIf],
  templateUrl: './editprojectreport.component.html',
  styleUrl: './editprojectreport.component.css'
})
export class EditprojectreportComponent {
  projectForm: FormGroup;
  projectReportStatus: any = {};

  @ViewChild('formContent')
  formContent!: ElementRef;

  reportId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.projectForm = this.fb.group({
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
    this.route.paramMap.subscribe((params) => {
      this.reportId = parseInt(params.get('id')!, 10);
      if (!isNaN(this.reportId)) {
        this.retrieveProjectStatusReport(this.reportId);
      }
    });
  }

  retrieveProjectStatusReport(reportId: number) {
    this.http.get(`http://localhost/arco/api/get_projectReport/${reportId}`).subscribe(
      (data: any) => {
        console.log(data);
        // Assign data to the form controls
        this.projectForm.patchValue(data.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  submitAndNavigate(id: number): void {
    if (this.projectForm.valid) {
      const reportData = this.projectForm.value;
      this.http.post(`http://localhost/arco2/arco/api/edit_projectreport/${id}`, reportData)
        .subscribe(
          (resp) => {
            console.log('Updated:', resp);
            // Navigate to the appropriate route upon success
            // this.router.navigate(['create/annualreport/view']);
          },
          (error) => {
            console.error('Error Submitting Report', error);
          }
        );
    } else {
      console.warn('Form is not valid. Check required fields.');
    }
  }

  formatDate(date: Date): string {
    if (!date) {
      return '';
    }
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }}