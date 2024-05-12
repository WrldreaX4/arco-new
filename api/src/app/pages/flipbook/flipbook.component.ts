import { Component } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-flipbook',
  standalone: true,
  imports: [SummaryComponent, NavbarComponent, RouterLink, RouterOutlet, RouterModule, ReportComponent, ProfileComponent,NavbarComponent],
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent {
  
}
