import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-annualreport',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './annualreport.component.html',
  styleUrl: './annualreport.component.css'
})
export class AnnualreportComponent {

  annualReport: any = {};


  reportId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute){
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.reportId = parseInt(params.get('id')!, 10);
      if (!isNaN(this.reportId)) {
        this.retrieveAnnualReport(this.reportId);
      }
    });
  }
  

  retrieveAnnualReport(id: number): void {
    this.http.get(`http://localhost/arco2/arco/api/annualreportonly/${id}`).subscribe(
      (resp: any) => {
        console.log(resp);
        this.annualReport = resp.data;
      },
      error => {
        console.error('Error fetching event report:', error);
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
        pdf.save('Financial_Report.pdf');
      });
    } else {
      console.error('The report data container was not found.');
    }
  }
}