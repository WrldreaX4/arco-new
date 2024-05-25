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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-flipbook',
  standalone: true,
  imports: [SummaryComponent, NavbarComponent, RouterLink, RouterOutlet, RouterModule, ReportComponent, ProfileComponent,NavbarComponent, CommonModule],
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements OnInit {

  userId: number | null = null;

  currentLocation = 1;
  collageData: any[] = [];
  paginatedData: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        console.log('User ID:', this.userId);
        this.retrieveEventReport(); // Call retrieveEventReport after userId is set
      } else {
        console.log('No user logged in.');
      }
    });
  }
  

  retrieveEventReport() {
    if (this.userId !== null) {
      const endpoint = `http://localhost/arco2/arco/api/collage_all/${this.userId}`;
      this.http.get(endpoint).subscribe(
        (resp: any) => {
          console.log(resp);
          this.collageData = resp.data;
          this.paginateData();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.error('User ID is not set.');
    }
  }

  paginateData() {
    this.paginatedData = [];
    for (let i = 0; i < this.collageData.length; i += 2) {
      this.paginatedData.push({
        front: this.collageData[i],
        back: this.collageData[i + 1] || null
      });
    }
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
    if (this.currentLocation < this.paginatedData.length) {
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