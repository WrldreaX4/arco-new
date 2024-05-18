import { Component, OnInit, Inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projectreportoutput',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './projectreportoutput.component.html',
  styleUrls: ['./projectreportoutput.component.css']
})
export class ProjectreportoutputComponent implements OnInit {

  httpClient = Inject(HttpClient);
  data: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.retrieveProjectStatusReport();
  }

  retrieveProjectStatusReport() {
    this.http.get('http://localhost/arco/api/get_projectReport/53').subscribe(
      (data: any) => {
        console.log(data);
        this.data = data.data;
      }, (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  downloadPDF() {
    const reportContainer = document.getElementById('reportContainer') as HTMLElement;

    if (reportContainer) {
      html2canvas(reportContainer, { scale: 2, useCORS: true }).then((canvas) => {
        const pdfWidth = canvas.width + 40; // Additional space to prevent cutting
        const pdfHeight = canvas.height + 40;

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [pdfWidth, pdfHeight] // Ensure ample space to avoid cutting
        });

        const margin = 20; // Margin for padding around the content
        const imgData = canvas.toDataURL('image/png');

        pdf.addImage(imgData, 'PNG', margin, margin, canvas.width, canvas.height);
        pdf.save('Project_Report.pdf');
      });
    } else {
      console.error('The report container was not found.');
    }
  }
}
