import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Race, RaceResult } from '../../interfaces/race';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private baseUrl = `${environment.apiUrl}/races`;

  constructor(private http: HttpClient) { }

  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  submitRace(raceData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.baseUrl}/submit`, raceData, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUpcomingRaces(): Observable<Race[]> {
    const headers = this.getHeaders();

    return this.http.get<Race[]>(`${this.baseUrl}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getRacesReadyForCompletion(): Observable<Race[]> {
    const headers = this.getHeaders();

    return this.http.get<Race[]>(`${this.baseUrl}/ready-to-complete`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCompletedRaces(): Observable<Race[]> {
    const headers = this.getHeaders();

    return this.http.get<Race[]>(`${this.baseUrl}/completed`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getRaceById(raceId: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.baseUrl}/${raceId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  signUpAsCommentator(raceId: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.baseUrl}/${raceId}/commentator`, {}, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  removeCommentator(raceId: string): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.post(`${this.baseUrl}/${raceId}/remove-commentator`, {}, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }
  

  completeRace(raceId: string, results: RaceResult[]): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.baseUrl}/${raceId}/complete`, { results }, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelRace(raceId: string): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.delete(`${this.baseUrl}/${raceId}`, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}