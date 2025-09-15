import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  private baseUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  getUserByDiscordUsername(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`, { headers, withCredentials: true });
  }

  updateDisplayName(displayName: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.baseUrl}/user/displayName`, { displayName }, { headers, withCredentials: true })
      .pipe(
        tap(() => {
          this.authService.checkAuthStatus(true).subscribe();
        }),
        catchError(this.handleError('updateDisplayName'))
      );
  }

  updatePronouns(pronouns: string): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.post<any>(`${this.baseUrl}/user/pronouns`, { pronouns }, { headers, withCredentials: true })
      .pipe(
        tap(() => {
          this.authService.checkAuthStatus(true).subscribe();
        }),
        catchError(error => {
          return this.handleError('updatePronouns')(error);
        })
      );
  }

  updateCountry(country: string | null): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.post<any>(`${this.baseUrl}/user/country`, { country }, { headers, withCredentials: true })
      .pipe(
        tap(() => {
          this.authService.checkAuthStatus(true).subscribe();
        }),
        catchError(error => {
          return this.handleError('updateCountry')(error);
        })
      );
  }
  
  private handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);
      throw error;
    };
  }
}