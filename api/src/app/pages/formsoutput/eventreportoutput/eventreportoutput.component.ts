import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-eventreportoutput',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgFor, CommonModule],
  templateUrl: './eventreportoutput.component.html',
  styleUrl: './eventreportoutput.component.css'
})
export class EventreportoutputComponent implements OnInit {
      
    eventReport: any = {};
    eventExpenses: any[] = [];
    userId: number | null = null;
    totalExpenses: number = 0;
  
    constructor(private http: HttpClient, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.userId = user.id;
          console.log('User ID:', this.userId);
          this.retrieveEventReport();
          this.retrieveEventExpenses();
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
  
    retrieveEventExpenses() {
      if (this.userId !== null) {
        this.http.get(`http://localhost/arco2/arco/api/eventexpenses/${this.userId}`).subscribe(
          (resp: any) => {
            console.log(resp);
            this.transformExpenses(resp.data);
            this.calculateTotalExpenses();
          },
          (error) => {
            console.error('Error fetching event expenses:', error);
          }
        );
      } else {
        console.error('User ID is not set.');
      }
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
  
    downloadPDF(): void {
      const element = document.querySelector('.reportdata') as HTMLElement;
      if (element) {
        html2canvas(element, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('event_report.pdf');
        });
      }
    }
  }