import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-eventreportoutput',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './eventreportoutput.component.html',
  styleUrl: './eventreportoutput.component.css'
})
export class EventreportoutputComponent implements OnInit {

  eventReport: any = {}
  userId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        console.log('User ID:', this.userId);
        this.retrieveEventReport();
      } else {
        console.log('No user logged in.');
      }
    });
  }

  retrieveEventReport() {
    if (this.userId !== null) {
      this.http.get(`http://localhost/arco2/arco/api/eventreport/${this.userId}`).subscribe(
        (resp: any) => {
          console.log(resp);
          this.eventReport = resp.data;
        },
        (error) => {
          console.error('Error fetching event report:', error);
        }
      );
    } else {
      console.error('User ID is not set.');
    }
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

