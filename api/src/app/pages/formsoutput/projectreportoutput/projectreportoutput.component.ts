import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-projectreportoutput',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './projectreportoutput.component.html',
  styleUrl: './projectreportoutput.component.css'
})
export class ProjectreportoutputComponent {

    projectStatusReport: any = {};
    data: any;
  
    constructor(private http: HttpClient){
    }
  
    projectManager: any[] = [];
    projectName: any[] = [];
    startDate: any[] = [];
    endDate: any[] = [];
    statusDesc: any[] = [];
    overallProgress: any[] = [];
    milestoneDesc: any[] = [];
    compeDate: any[] = [];
    taskDesc: any[] = [];
    stat: any[] = [];
    issuesName: any[] = [];
    issuesPrio: any[] = [];

    ngOnInit(): void {
      this.retrieveProjectStatusReport()
    }
  
    retrieveProjectStatusReport(){
      this.http.get('http://localhost/arco/api/get_project_report/17').subscribe(
        (resp: any) => {
          console.log(resp);
          this.data = resp.payload;
          this.projectManager = resp.data;
          this.projectName = resp.data;
          this.startDate = resp.data;
          this.endDate = resp.data;
          this.statusDesc = resp.data;
          this.overallProgress = resp.data;
          this.milestoneDesc = resp.data;
          this.compeDate = resp.data;
          this.taskDesc = resp.data;
          this.stat = resp.data;
          this.issuesName = resp.data;
          this.issuesPrio = resp.data;
        }, (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  
  
    downloadPDF() {
      // Use type assertion to ensure the element is an HTMLElement
      const reportData = document.querySelector('.reportdata') as HTMLElement;
  
      if (reportData) {
        html2canvas(reportData, { scale: 2, useCORS: true }).then((canvas) => {
          const pdfWidth = canvas.width + 80; // Additional space to prevent cutting
          const pdfHeight = canvas.height + 80;
  
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [pdfWidth, pdfHeight], // Ensure ample space to avoid cutting
          });
  
          const margin = 40; // Margin for padding around the content
          const imgData = canvas.toDataURL('image/png');
  
          pdf.addImage(imgData, 'PNG', margin, margin, canvas.width, canvas.height);
          pdf.save('Project_Report.pdf');
        });
      } else {
        console.error('The report data container was not found.');
      }
    }

  }
