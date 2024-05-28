import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/arco2/arco/api';
  private tokenKey = 'jwt';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      const token = this.getToken();
      if (token) {
        this.currentUserSubject.next(this.decodeToken(token).data);
      }
    }
  }

  userLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login.php`, data)
     .pipe(
        catchError(this.handleError)
      );
  }

  userSignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup.php`, data)
     .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Http failure during parsing:', error);
    return throwError('Something went wrong during parsing. Please try again later.');
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
      this.currentUserSubject.next(this.decodeToken(token).data);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token?!this.isTokenExpired(token) : false;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      this.currentUserSubject.next(null);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Decode the JWT token
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token format:', e);
      return null;
    }
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate < new Date();
    }
    return true;
  }

  // userid getter
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}