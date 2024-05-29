import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { CreateformComponent } from '../createform/createform.component';
import { ProfileComponent } from '../profile/profile.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterLink,
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    CreateformComponent,
    ProfileComponent,
    FlipbookComponent,
    ReportComponent,
    CommonModule,
    GoogleChartsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  projectReports: any[] = [];
  userId: number | null = null;
  financialReports: any[] = [];
  chart = {
    type: ChartType.ColumnChart,
    data: [] as any[][],
    columns: ['Category', 'Amount'] as string[],
    options: {}
  };

  chartOptions = {
    title: 'Financial Overview',
    colors: ['#1c91c0', '#e7711b', '#f1ca3a'],
    hAxis: {
      title: 'Category',
      titleTextStyle: { color: '#333' }
    },
    vAxis: {
      minValue: 0,
      title: 'Amount',
      titleTextStyle: { color: '#333' }
    },
    chartArea: { width: '70%', height: '70%' },
    legend: { position: 'bottom' }
  };

records:any[]=[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        console.log('User ID:', this.userId);
        this.retrieveFinancialReports();
        this.retrieveProjectReports();
      } else {
        console.log('No user logged in.');
      }
    });
    this.getImage();
  }

  getImage() {
    this.authService.getCollage().subscribe(
      (data) => {
        console.log('Server response:', data); // Log server response
        if (data.status === 'success') {
          this.records = data.data;
          console.log('Records:', this.records); // Log records
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  retrieveFinancialReports() {
    if (this.userId !== null) {
      this.http.get(`http://localhost/arco2/arco/api/financialreportall/${this.userId}`).subscribe(
        (resp: any) => {
          console.log(resp);
          this.financialReports = resp.data;
          this.updateChartData();
        },
        (error) => {
          console.error('Error fetching financial reports:', error);
        }
      );
    } else {
      console.error('User ID is not set.');
    }
  }

  retrieveProjectReports() {
    if (this.userId !== null) {
      this.http.get(`http://localhost/arco2/arco/api/projectreportall/${this.userId}`).subscribe(
        (resp: any) => {
          console.log(resp);
          this.projectReports = resp.data.map((report: any) => ({
            ...report,
            overallProgress: this.parseProgress(report.overallProgress)
          }));
        },
        (error) => {
          console.error('Error fetching project reports:', error);
        }
      );
    } else {
      console.error('User ID is not set.');
    }
  }

  parseProgress(progress: string): number {
    const cleanedProgress = progress.replace('%', '');
    const parsed = parseFloat(cleanedProgress);
    return isNaN(parsed) ? 0 : parsed;
  }

  updateChartData() {
    let totalIncome = 0;
    let totalSpendings = 0;

    this.financialReports.forEach(report => {
      totalIncome += this.calculateTotalIncome(report);
      totalSpendings += this.calculateTotalSpendings(report);
    });

    this.chart.data = [
      ['Total Income', totalIncome],
      ['Total Spending', totalSpendings],
      ['Net Income', totalIncome - totalSpendings]
    ];
    this.chart.options = this.chartOptions;
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
}
