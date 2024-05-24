import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-annualreportoutput',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './annualreportoutput.component.html',
  styleUrl: './annualreportoutput.component.css'
})
export class AnnualreportoutputComponent {

  annualReport: any = {};
  data: any;

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.retrieveAnnualReport()
  }

  

  retrieveAnnualReport(){
    this.http.get('http://localhost/arco2/arco/api/annualreport/${reportId}').subscribe(
      (resp: any) => {
        console.log(resp);
        this.data = resp.payload;
        this.annualReport = resp.data;
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
        pdf.save('Financial_Report.pdf');
      });
    } else {
      console.error('The report data container was not found.');
    }
  }
}