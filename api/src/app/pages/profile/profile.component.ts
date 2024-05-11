import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterOutlet, RouterModule],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
