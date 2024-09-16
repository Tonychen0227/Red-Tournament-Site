import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
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

  updateTimezone(timezone: number): Observable<any> {
    const headers = this.getHeaders();
  
    console.log('Sending timezone:', { timezone });
  
    return this.http.post<any>(`${this.baseUrl}/user/timezone`, { timezone }, { headers, withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Timezone update response:', response);
          this.authService.checkAuthStatus(true).subscribe();
        }),
        catchError(error => {
          console.error('updateTimezone failed:', error);
          // Log the detailed error response
          if (error.error) {
            console.error('Backend Error Details:', error.error);
          }
          return this.handleError('updateTimezone')(error);
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