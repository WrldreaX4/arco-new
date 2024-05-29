import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editprojectreport',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, NgFor],
  templateUrl: './editprojectreport.component.html',
  styleUrl: './editprojectreport.component.css'
})
export class EditprojectreportComponent {
  projectForm: FormGroup;
  projectReportStatus: any = {};

  projectID: number = 0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectManager: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      statusDesc: new FormControl('', Validators.required),
      overallProgress: new FormControl('', Validators.required),
      milestoneDesc: new FormControl('', Validators.required),
      compeDate: new FormControl('', Validators.required),
      taskDesc: new FormControl('', Validators.required),
      stat: new FormControl('', Validators.required),
      issuesName: new FormControl('', Validators.required),
      issuesPrio: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectID = parseInt(params.get('id')!, 10);
      if (!isNaN(this.projectID)) {
        this.retrieveProjectStatusReport(this.projectID);
      }
    });
  }

  retrieveProjectStatusReport(projectID: number): void {
    this.http.get(`http://localhost/arco2/arco/api/projectreportonly/${projectID}`).subscribe(
      (resp: any) => {
        console.log(resp);
        this.projectReportStatus = resp.data;
        this.projectForm.patchValue(this.projectReportStatus); // Populate form with retrieved data
      },
      error => {
        console.error('Error fetching project report:', error);
      }
    );
  }

submitAndNavigate(id: number): void {
    if (this.projectForm.valid) {
      const reportData = this.projectForm.value; // Use annualForm to extract values

      // Post data to the specified endpoint
      this.http.post(`http://localhost/arco2/arco/api/edit_projectreport/${id}`, reportData)
        .subscribe(
          (resp) => {
            console.log('Updated:', resp);
             this.router.navigate(['create/projectreport/view']); 
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