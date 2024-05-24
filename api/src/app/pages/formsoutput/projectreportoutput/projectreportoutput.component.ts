import { Component, OnInit, Inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { EditprojectreportComponent } from '../../edit/editprojectreport/editprojectreport.component';

@Component({
  selector: 'app-projectreportoutput',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HttpClientModule, FormsModule, RouterLink, EditprojectreportComponent],
  templateUrl: './projectreportoutput.component.html',
  styleUrls: ['./projectreportoutput.component.css']
})
export class ProjectreportoutputComponent implements OnInit {

  projectStatusReport: any = {};
  data: any;


  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.retrieveProjectStatusReport();
  }

  retrieveProjectStatusReport() {
    this.http.get('http://localhost/arco2/arco/api/projectreport/${projectID}').subscribe(
      (resp: any) => {
        console.log(resp);
        this.data = resp.payload;
        this.projectStatusReport = resp.data;
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
