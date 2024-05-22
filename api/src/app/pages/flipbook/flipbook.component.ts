import { Component, OnInit } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CollageComponent } from '../collage/collage.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flipbook',
  standalone: true,
  imports: [SummaryComponent, NavbarComponent, RouterLink, RouterOutlet, RouterModule, ReportComponent, ProfileComponent,NavbarComponent, CommonModule],
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements OnInit {

  currentLocation = 1;
  numOfPapers = 3;
  maxLocation = this.numOfPapers + 1;

  collageData: any[] = [];
  constructor(private http: HttpClient){

  }

  eventReport: any = {}


  retrieveEeventReport(){
    this.http.get('http://localhost/arco2/arco/api/eventreport/2').subscribe(
      (resp: any) => {
        console.log(resp);
        this.eventReport = resp.data;
      }
    )
  }

  ngOnInit(): void {
    this.retrieveEventReport();
    this.retrieveEeventReport();
  }
  retrieveEventReport(){
    this.http.get('http://localhost/arco2/arco/api/collage_all/2').subscribe(
      (resp: any) => {
        console.log(resp);
        this.collageData = resp.data;
      }
    )
  }

  openBook() {
    const book = document.querySelector("#book") as HTMLElement;
    const prevBtn = document.querySelector("#prev-btn") as HTMLElement;
    const nextBtn = document.querySelector("#next-btn") as HTMLElement;
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
  }

  closeBook(isAtBeginning: boolean) {
    const book = document.querySelector("#book") as HTMLElement;
    const prevBtn = document.querySelector("#prev-btn") as HTMLElement;
    const nextBtn = document.querySelector("#next-btn") as HTMLElement;
    if (isAtBeginning) {
      book.style.transform = "translateX(0%)";
    } else {
      book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
  }

  goNextPage() {
    if (this.currentLocation < this.maxLocation) {
      switch (this.currentLocation) {
        case 1:
          this.openBook();
          break;
        case 2:
          break;
        case 3:
          this.closeBook(false);
          break;
        default:
          throw new Error("unknown state");
      }
      this.currentLocation++;
    }
  }

  goPrevPage() {
    if (this.currentLocation > 1) {
      switch (this.currentLocation) {
        case 2:
          this.closeBook(true);
          break;
        case 3:
          break;
        case 4:
          this.openBook();
          break;
        default:
          throw new Error("unknown state");
      }
      this.currentLocation--;
    }
  }
}