import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost/arco2/arco/api'; // Remove '/login' from the base URL

  constructor(private http: HttpClient) { }

  userLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  userSignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data) 
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Http failure during parsing:', error);
    return throwError('Something went wrong during parsing. Please try again later.');
  }
}
