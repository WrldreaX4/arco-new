import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eventreportoutput',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './eventreportoutput.component.html',
  styleUrl: './eventreportoutput.component.css'
})
export class EventreportoutputComponent implements OnInit {

  eventReport: any = {}

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.retrieveEventReport();
  }

  retrieveEventReport(){
    this.http.get('http://localhost/arco2/arco/api/eventreport/2').subscribe(
      (resp: any) => {
        console.log(resp);
        this.eventReport = resp.data;
      }
    )
  }
  downloadPDF() {
    const reportData = document.querySelector('.reportdata') as HTMLElement;

    if (reportData) {
      html2canvas(reportData, { scale: 2, useCORS: true }).then((canvas) => {
        const pdfWidth = canvas.width + 80; 
        const pdfHeight = canvas.height + 80;

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [pdfWidth, pdfHeight], 
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

