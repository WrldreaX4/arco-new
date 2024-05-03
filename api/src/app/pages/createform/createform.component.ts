import { Component } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-createform',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, NavbarComponent, CreateformComponent, SummaryComponent, ProfileComponent,FlipbookComponent, ReportComponent],
  templateUrl: './createform.component.html',
  styleUrl: './createform.component.css'
})
export class CreateformComponent {

}
