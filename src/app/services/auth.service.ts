import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  
  private user: any = null;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(public globals: Globals, private http: HttpClient, private router: Router) { }

  login(): void {
    window.location.href = `${this.baseUrl}/login`;
  }

  checkAuthStatus(forceRefresh = false): Observable<any> {
    const cachedUser = sessionStorage.getItem('user');
    const cachedTimestamp = sessionStorage.getItem('userTimestamp');

    console.log(`FEKAR: Checking auth status. Cached user: ${cachedUser} with timestamp ${cachedTimestamp}`);

    if (cachedUser && cachedTimestamp && !forceRefresh) {
      const isCacheValid = (new Date().getTime() - parseInt(cachedTimestamp)) < this.cacheDuration;
      if (isCacheValid) {
        const user = JSON.parse(cachedUser);
        this.updateGlobals(user);

        console.log(`FEKAR: User authenticated via cache. Data: ${JSON.stringify(user)}`);
        return of(user);
      }
    }

    return this.http.get(`${this.baseUrl}/auth-status`, { withCredentials: true }).pipe(
      tap(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userTimestamp', new Date().getTime().toString());

        console.log(`FEKAR: Auth successful. Data: ${JSON.stringify(user)}`);
        this.updateGlobals(user);        
      }),
      catchError(error => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userTimestamp');
        this.clearGlobals();
        console.log(`FEKAR: Auth failed with error ${error}`);
        return of(null);
      })
    );
  }

  private updateGlobals(user: any): void {
    this.globals.userId = user._id;
    this.globals.displayName = user.global_name || user.displayName;
    this.globals.discordUsername = user.username;
    this.globals.avatarUrl = user.photos?.[0]?.value;
    this.globals.role = user.role;
    this.globals.isAdmin = user.isAdmin;
  }
  
  private clearGlobals(): void {
    this.globals.userId = undefined;
    this.globals.displayName = undefined;
    this.globals.discordUsername = undefined;
    this.globals.avatarUrl = undefined;
    this.globals.role = undefined;
    this.globals.isAdmin = undefined;
  }

  isAdmin(): boolean {
    return this.globals.isAdmin === true;
  }
  
  logout(): void {

    this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.user = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userTimestamp');
        this.clearGlobals();
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: err => {
        console.error('Logout failed', err);
      }
    });
  }
}