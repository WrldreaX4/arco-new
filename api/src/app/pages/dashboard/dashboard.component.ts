import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CreateformComponent } from '../createform/createform.component';
import { SummaryComponent } from '../summary/summary.component';
import { ProfileComponent } from '../profile/profile.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { ReportComponent } from '../report/report.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    CreateformComponent,
    ProfileComponent,
    FlipbookComponent,
    ReportComponent,
    CommonModule,
    GoogleChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  // ngAfterViewInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.initCarousel();
  //   }
  // }

  // initCarousel() {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return; // Exit the function if not in browser environment
  //   }
  //   const $ = (str: string) => document.querySelector(str);
  //   const $$ = (str: string) => document.querySelectorAll(str);

  //   const carousel = {
  //     removeClass(el: HTMLElement, classname: string = '') {
  //       if (el) {
  //         if (classname === '') {
  //           el.className = '';
  //         } else {
  //           el.classList.remove(classname);
  //         }
  //         return el;
  //       }
  //       return null;
  //     },
  //     reorder() {
  //       const carouselElement = $("#carousel");
  //       if (carouselElement) {
  //         const childcnt = carouselElement.children.length;
  //         const childs = carouselElement.children;
  //         for (let j = 0; j < childcnt; j++) {
  //           const child = childs[j] as HTMLElement;
  //           if (child) {
  //             child.dataset['pos'] = j.toString();
  //           }
  //         }
  //       }
  //     },
  //     move(el: HTMLElement | string) {
  //       let selected = el as HTMLElement;
  //       if (typeof el === 'string') {
  //         const selectedElement = $(".selected");
  //         if (selectedElement) {
  //           selected = (el === 'next') ? selectedElement.nextElementSibling as HTMLElement : selectedElement.previousElementSibling as HTMLElement;
  //         }
  //       }
  //       const curpos = parseInt((carouselState.selected as HTMLElement).dataset?.['pos'] || '0');
  //       const tgtpos = parseInt(selected.dataset?.['pos'] || '0');
  //       const cnt = curpos - tgtpos;
  //       const dir = (cnt < 0) ? -1 : 1;
  //       const shift = Math.abs(cnt);
  //       const carouselElement = $("#carousel");
  //       if (carouselElement) {
  //         for (let i = 0; i < shift; i++) {
  //           const element = (dir === -1) ? carouselElement.firstElementChild as HTMLElement : carouselElement.lastElementChild as HTMLElement;
  //           if (element) {
  //             if (dir === -1) {
  //               element.dataset['pos'] = (carouselElement.children.length).toString();
  //               carouselElement.append(element);
  //             } else {
  //               element.dataset['pos'] = '0';
  //               carouselElement.prepend(element);
  //             }
  //             carousel.reorder();
  //           }
  //         }
  //       }
  //       carouselState.selected = selected;

  //       const next = selected.nextElementSibling as HTMLElement;
  //       const prev = selected.previousElementSibling as HTMLElement;
  //       const parentElement = selected.parentElement;
        
  //       if (parentElement) {
  //         const prevSecond = prev ? prev.previousElementSibling as HTMLElement : parentElement.lastElementChild as HTMLElement;
  //         const nextSecond = next ? next.nextElementSibling as HTMLElement : parentElement.firstElementChild as HTMLElement;
        
  //         selected.className = '';
  //         selected.classList.add('selected');
          
  //         if (prev) {
  //           carousel.removeClass(prev)?.classList.add('prev');
  //         }
          
  //         if (next) {
  //           carousel.removeClass(next)?.classList.add('next');
  //         }
        
  //         if (nextSecond) {
  //           carousel.removeClass(nextSecond)?.classList.add('nextRightSecond');
  //         }
        
  //         if (prevSecond) {
  //           carousel.removeClass(prevSecond)?.classList.add('prevLeftSecond');
  //         }
        
  //         carousel.nextAll(nextSecond)?.forEach(item => { 
  //           if (item) {
  //             carousel.removeClass(item)?.classList.add('hideRight'); 
  //           }
  //         });
        
  //         carousel.prevAll(prevSecond)?.forEach(item => { 
  //           if (item) {
  //             carousel.removeClass(item)?.classList.add('hideLeft'); 
  //           }
  //         });
  //       }
  //     },
  //     nextAll(el: HTMLElement) {
  //       const els = [];
  //       if (el) {
  //         while (el = el.nextElementSibling as HTMLElement) { els.push(el); }
  //       }
  //       return els;
  //     },
  //     prevAll(el: HTMLElement) {
  //       const els = [];
  //       if (el) {
  //         while (el = el.previousElementSibling as HTMLElement) { els.push(el); }
  //       }
  //       return els;
  //     },
  //     keypress(e: KeyboardEvent) {
  //       switch (e.key) {
  //         case 'ArrowLeft':
  //           carousel.move('prev');
  //           break;
  //         case 'ArrowRight':
  //           carousel.move('next');
  //           break;
  //         default:
  //           return;
  //       }
  //       e.preventDefault();
  //       return false;
  //     },
  //     select(e: MouseEvent) {
  //       let tgt = e.target as HTMLElement;
  //       while (tgt.parentElement && !tgt.parentElement.classList.contains('carousel')) {
  //           tgt = tgt.parentElement as HTMLElement;
  //       }
  //       if (tgt.parentElement) {
  //           carousel.move(tgt);
  //       } else {
  //           console.error("Parent element with class 'carousel' not found.");
  //       }
  //   },
  //     previous(e: MouseEvent) {
  //       carousel.move('prev');
  //     },
  //     next(e: MouseEvent) {
  //       carousel.move('next');
  //     },
  //     doDown(e: MouseEvent | TouchEvent) {
  //       const event = 'touches' in e ? e.touches[0] : e;
  //       carouselState.downX = event.clientX;
  //     },
  //     doUp(e: MouseEvent | TouchEvent) {
  //       const event = 'changedTouches' in e ? e.changedTouches[0] : e;
  //       if (carouselState.downX) {
  //         const direction = (carouselState.downX > event.clientX) ? -1 : 1;
  //         if (Math.abs(carouselState.downX - event.clientX) < 10) {
  //           carousel.select(e as MouseEvent);
  //           return false;
  //         }
  //         if (direction === -1) {
  //           carousel.move('next');
  //         } else {
  //           carousel.move('prev');
  //         }
  //         carouselState.downX = 0;
  //       }
  //       return; // Ensure that the function always returns a value
  //     },
  //     init() {
  //       if (typeof document !== 'undefined') {
  //         document.addEventListener('keydown', carousel.keypress);
  //         const carouselElement = document.getElementById('carousel');
  //         if (carouselElement) {
  //             carouselElement.addEventListener('mousedown', carousel.doDown);
  //             carouselElement.addEventListener('touchstart', carousel.doDown);
  //             carouselElement.addEventListener('mouseup', carousel.doUp);
  //             carouselElement.addEventListener('touchend', carousel.doUp);
  //             carousel.reorder();
  //         } else {
  //             console.error('Carousel element not found.');
  //         }
      
  //         const prevButton = document.getElementById('prev');
  //         const nextButton = document.getElementById('next');
  //         if (prevButton) {
  //             prevButton.addEventListener('click', carousel.previous);
  //         } else {
  //             console.error('Previous button not found.');
  //         }
  //         if (nextButton) {
  //             nextButton.addEventListener('click', carousel.next);
  //         } else {
  //             console.error('Next button not found.');
  //         }
      
  //         carouselState.selected = document.querySelector('.selected') as HTMLElement;
  //       }
  //     }
  //   };

  //   const carouselState: { selected: HTMLElement | null, downX: number } = {
  //     selected: null,
  //     downX: 0
  //   }

  //   carousel.init();
  // }
}
