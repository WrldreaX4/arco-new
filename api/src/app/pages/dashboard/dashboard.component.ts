import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient){

  }
  
  ngOnInit(): void {
      this.getAllUsers();
  }

  getAllUsers() {
   
    this.http.get('http://localhost/arco/api/get_signup').subscribe((res:any) => {
    this.users = res.data;
  }, _error => {
    alert('Error from API')
  }
    )
  }
}
