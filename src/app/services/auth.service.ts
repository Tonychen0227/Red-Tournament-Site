import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/api/';
  
  private user: any = null;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    window.location.href = `${this.authUrl}/login`;
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
    return this.http.get(`${this.authUrl}/auth-status`, { withCredentials: true }).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userTimestamp', new Date().getTime().toString());
      }),
      catchError(error => {
        console.error('Error checking auth status:', error);
        this.user = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userTimestamp');
        return of(null);
      })
    );
  }
  
  logout(): void {
    this.http.post(`${this.authUrl}/logout`, {}, { withCredentials: true }).subscribe({
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