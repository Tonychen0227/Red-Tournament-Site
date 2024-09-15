import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  
  private user: any = null;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    window.location.href = `${this.baseUrl}/login`;
  }

  checkAuthStatus(forceRefresh = false): Observable<any> {
    const cachedUser = sessionStorage.getItem('user');
    const cachedTimestamp = sessionStorage.getItem('userTimestamp');

    if (cachedUser && cachedTimestamp && !forceRefresh) {
      const isCacheValid = (new Date().getTime() - parseInt(cachedTimestamp)) < this.cacheDuration;
      if (isCacheValid) {
        this.user = JSON.parse(cachedUser);
        return of(this.user);
      }
    }

    // Fetch fresh user data from the server
    return this.http.get(`${this.baseUrl}/auth-status`, { withCredentials: true }).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userTimestamp', new Date().getTime().toString());        
      }),
      catchError(error => {
        console.log('User is not logged in.');
        
        this.user = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userTimestamp');
        return of(null);
      })
    );
  }

  isAdmin(): boolean {
    return this.user?.isAdmin === true;
  }
  
  logout(): void {

    this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.user = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userTimestamp');
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: err => {
        console.error('Logout failed', err);
      }
    });
  }
}