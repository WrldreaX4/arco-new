import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-viewfinancialrepert',
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgFor, NgIf, CommonModule],
  templateUrl: './viewfinancialrepert.component.html',
  styleUrl: './viewfinancialrepert.component.css'
})
export class ViewfinancialrepertComponent {
  financialReport: any = {};
  financialreport_id: number = 0;
  data: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.financialreport_id = parseInt(params.get('id')!, 10);
      if (!isNaN(this.financialreport_id)) {
        this.retrieveAnnualReport(this.financialreport_id);
      }
    });
  }


  retrieveAnnualReport(financialreport_id: number): void {
    this.http.get(`http://localhost/arco2/arco/api/finacialreportonly/${financialreport_id}`).subscribe(
      (resp: any) => {
        console.log(resp);
        this.financialReport = resp.data;
        this.financialReport.patchValue(this.financialReport); // Populate form with retrieved data
      },
      error => {
        console.error('Error fetching Annual report:', error);
      }
    );
  }


  extractIncomes(data: any): any[] {
    const incomes = [];
    for (let i = 1; i <= 10; i++) {
      if (data[`income${i}`] && data[`income_salary${i}`]) {
        incomes.push({ source: data[`income${i}`], amount: data[`income_salary${i}`] });
      }
    }
    return incomes;
  }
  
  extractExpenses(data: any): any[] {
    const expenses = [];
    for (let i = 1; i <= 10; i++) {
      if (data[`expense_item${i}`] && data[`expense_amount${i}`]) {
        expenses.push({ item: data[`expense_item${i}`], amount: data[`expense_amount${i}`] });
      }
    }
    return expenses;
  }
  
  calculateTotalIncome(data: any): number {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += parseFloat(data[`income_salary${i}`]) || 0;
    }
    return total;
  }
  
  calculateTotalSpendings(data: any): number {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += parseFloat(data[`expense_amount${i}`]) || 0;
    }
    return total;
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


