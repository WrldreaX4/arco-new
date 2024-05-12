import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-projectreportstatus',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './projectreportstatus.component.html',
  styleUrl: './projectreportstatus.component.css'
})
export class ProjectReportStatusComponent implements OnInit {
  projectReportForm: FormGroup;

  @ViewChild('formContent')
  formContent!: ElementRef;
  datePipe: any;
  

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.projectReportForm = this.fb.group({
      projectName: ['', Validators.required],
      projectManager: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      milestoneDesc: ['', Validators.required],
      compeDate: ['', Validators.required],
      taskDesc: ['', Validators.required],
      stat: ['', Validators.required],
      issuesName: ['', Validators.required],
      issuesPrio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitAndNavigate() {
    if (this.projectReportForm.valid) {
      const reportData = this.projectReportForm.value;

      this.http.post('http://localhost/arco/api/project_status_report', reportData)
        .subscribe(
          (resp: any) => {
            console.log('Project Status Report submitted:', resp);
            this.router.navigate(['/summary']);
          },
          (error: any) => {
            console.error('Error submitting project status report:', error);
          }
        );
    } else {
      console.warn('Form is not valid. Please check required fields.');
    }
  }

  downloadPDF() {
    const formContent = this.formContent?.nativeElement;
    if (!formContent) {
        console.error('Form content element not found.');
        return;
    }

    html2canvas(formContent).then((canvas) => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('project_status_report.pdf');
    });
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
}
}