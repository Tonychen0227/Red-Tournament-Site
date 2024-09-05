import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Race, RaceResult } from '../../interfaces/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private baseUrl = 'http://localhost:3000/api/races';

  constructor(private http: HttpClient) { }

  submitRace(raceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, raceData, { withCredentials: true });
  }

  getUpcomingRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRacesReadyForCompletion(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.baseUrl}/ready-to-complete`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCompletedRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.baseUrl}/completed`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRaceById(raceId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${raceId}`);
  }

  signUpAsCommentator(raceId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${raceId}/commentator`, {}, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }  

  completeRace(raceId: string, results: RaceResult[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${raceId}/complete`, { results }, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelRace(raceId: string): Observable<any> {
    // TODO: Cancel race endpoint
    return new Observable;
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