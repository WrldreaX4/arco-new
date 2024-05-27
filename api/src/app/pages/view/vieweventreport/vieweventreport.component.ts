import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-vieweventreport',
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgFor, CommonModule],
  templateUrl: './vieweventreport.component.html',
  styleUrls: ['./vieweventreport.component.css']
})
export class VieweventreportComponent implements OnInit {
  eventReport: any = {};
  eventExpenses: any[] = [];
  totalExpenses: number = 0;
  event_id: number = 0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.event_id = parseInt(params.get('id')!, 10);
      if (!isNaN(this.event_id)) {
        this.retrieveEventReport(this.event_id);
        this.retrieveEventExpenses(this.event_id);
      }
    });
  }

  retrieveEventReport(event_id: number): void {
    this.http.get(`http://localhost/arco2/arco/api/eventreportonly/${event_id}`).subscribe(
      (resp: any) => {
        console.log(resp);
        this.eventReport = resp.data;
      },
      error => {
        console.error('Error fetching event report:', error);
      }
    );
  }

  retrieveEventExpenses(event_id: number): void {
    this.http.get(`http://localhost/arco2/arco/api/eventexpenses/${event_id}`).subscribe(
      (resp: any) => {
        console.log(resp);
        this.transformExpenses(resp.data);
        this.calculateTotalExpenses();
      },
      error => {
        console.error('Error fetching event expenses:', error);
      }
    );
  }

  transformExpenses(data: any) {
    this.eventExpenses = [];
    for (let i = 1; i <= 10; i++) {
      if (data[`expense_item${i}`] || data[`expense_amount${i}`]) {
        this.eventExpenses.push({
          item: data[`expense_item${i}`],
          amount: data[`expense_amount${i}`]
        });
      }
    }
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.eventExpenses.reduce((total, expense) => {
      return total + (parseFloat(expense.amount) || 0);
    }, 0);
  }

  downloadPDF() {
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
        pdf.save('Event_Report.pdf');
      });
    } else {
      console.error('The report data container was not found.');
    }
  }
}
