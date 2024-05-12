import { Component } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CollageComponent } from '../collage/collage.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterOutlet, SummaryComponent, NavbarComponent, DashboardComponent, CollageComponent, ReportComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
