import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import  flatpickr  from 'flatpickr';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Report {
  report_id: number;
  created_at: string;
  title: string;
}

interface Event {
  event_id: number;
  event_date: string;
  event_name: string;
}

interface FinancialReport {
  financialreport_id: number;
  start_date: string;
  report_title: string;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink,RouterModule, RouterOutlet, NavbarComponent, NgFor, NgIf, DatePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  providers: [DatePipe, JsonPipe]
})
export class SummaryComponent implements AfterViewInit, OnDestroy, OnInit {
  private dateRangePicker: flatpickr.Instance | null = null; // Initialize with null
    filteredAnnualReport: Report[] = [];
    filteredEventReport: Event[] = [];
    filteredFinancialReport: FinancialReport[] = [];
    annualReport: any = {};
    eventReport: any = {}
    financialReport: any = {}

    constructor(private http: HttpClient, private datePipe: DatePipe, private route: ActivatedRoute) {
      this.annualReport = [];
      this.eventReport = [];
      this.financialReport = [];

      this.retrieveAnnualReport();
      this.retrieveEventReport();
      this.retrieveFinancialReport();
    }


    ngOnInit(): void {
}

deleteReport(reportId: number): void {
  const confirmed = confirm('Are you sure you want to delete this report?');
  if (confirmed) {
    this.http.post(`http://localhost/arco2/arco/api/delete_annualreport/${reportId}`, {})
     .subscribe(
        () => {
          this.annualReport = this.annualReport.filter((report: any) => report.report_id!== reportId);
        },
        error => {
          console.error('Error deleting report:', error);
        }
      );
  }
}
deleteEvent(eventId: number): void {
  const confirmed = confirm('Are you sure you want to delete this event?');
  if (confirmed) {
    this.http.post(`http://localhost/arco3/api/delete_eventreport/${eventId}`, {})
      .subscribe(
        () => {
          this.eventReport = this.eventReport.filter((event: any) => event.event_id !== eventId);
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
  }
}


deleteFinancialReport(financialReportId: number): void {
  const confirmed = confirm('Are you sure you want to delete this financial report?');
  if (confirmed) {
    this.http.post(`http://localhost/arco3/api/delete_financialreport/${financialReportId}`, {})
      .subscribe(
        () => {
          this.financialReport = this.financialReport.filter((entry: any) => entry.financialreport_id !== financialReportId);
        },
        error => {
          console.error('Error deleting financial report:', error);
        }
      );
  }
}



    retrieveAnnualReport(){
      this.http.get('http://localhost/arco2/arco/api/annualreportall/2').subscribe(
        (resp: any) => {
          console.log(resp);
          this.annualReport = resp.data;
        }, (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    retrieveEventReport(){
      this.http.get('http://localhost/arco2/arco/api/eventreportall/2').subscribe(
        (resp: any) => {
          console.log(resp);
          this.eventReport = resp.data;
        }
      )
    }

    retrieveFinancialReport(){
      this.http.get('http://localhost/arco2/arco/api/financialreportall/2').subscribe(
        (resp: any) => {
          console.log(resp);
          this.financialReport = resp.data;
        }, (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

  
    formatDate(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'EEEE'); // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }

    formatDate1(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'd');  // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }

    formatDate2(date: string): string | null {
      const transformedDate = this.datePipe.transform(date, 'MMMM d');  // Output like "Sunday, May 17, 2023"
      return transformedDate !== null ? transformedDate : null;
    }
    ngAfterViewInit(): void {
      const pickerInstance = flatpickr('#date-range-icon', {
        mode: 'range',
        dateFormat: 'F j, Y',
        onChange: (selectedDates: Date[]) => {
          this.updateSelectedRangeText(selectedDates);
        },
      });
      this.dateRangePicker = Array.isArray(pickerInstance) ? pickerInstance[0] : pickerInstance;
    }
  
    ngOnDestroy() {
      if (this.dateRangePicker) {
        this.dateRangePicker.destroy();
        this.dateRangePicker = null; // Ensures cleanup
      }
    }

    
  
   
  private updateSelectedRangeText(selectedDates: Date[]): void {
    const selectedRange = selectedDates
      .map(date => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
      .join(' to ');

    const selectedRangeElement = document.getElementById('selected-range');
    if (selectedRangeElement) {
      selectedRangeElement.textContent = `${selectedRange}`;
    }

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;

      this.filteredAnnualReport = this.annualReport.filter((report: Report) => {
        const reportDate = new Date(report.created_at);
        return reportDate >= start && reportDate <= end;
      });

      this.filteredFinancialReport = this.financialReport.filter((finance: FinancialReport) => {
        const financeDate = new Date(finance.start_date);
        return financeDate >= start && financeDate <= end;
      });

      this.filteredEventReport = this.eventReport.filter((event: Event) => {
        const eventDate = new Date(event.event_date);
        return eventDate >= start && eventDate <= end;
      });
    }
  }
  
  setDayRange(): void {
    if (this.dateRangePicker) {
      const today = new Date();
      this.dateRangePicker.setDate([today, today]);
      this.updateSelectedRangeText([today]);
    }
  }
  
  setWeekRange(): void {
    if (this.dateRangePicker) {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
      this.dateRangePicker.setDate([startOfWeek, endOfWeek]);
      this.updateSelectedRangeText([startOfWeek, endOfWeek]);
    }
  }
  
  setMonthRange(): void {
    if (this.dateRangePicker) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      this.dateRangePicker.setDate([startOfMonth, endOfMonth]);
      this.updateSelectedRangeText([startOfMonth, endOfMonth]);
    }
  }
  
  setYearRange(): void {
    if (this.dateRangePicker) {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      this.dateRangePicker.setDate([startOfYear, endOfYear]);
      this.updateSelectedRangeText([startOfYear, endOfYear]);
    }
  }
}