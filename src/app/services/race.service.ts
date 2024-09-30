import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Race, RaceResult } from '../../interfaces/race';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/races`;
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

  getUserRaces(): Observable<{ racesParticipatedIn: Race[], racesCommentated: Race[] }> {
    const headers = this.getHeaders();
    return this.http.get<{ racesParticipatedIn: Race[], racesCommentated: Race[] }>(`${this.baseUrl}/user`, { headers, withCredentials: true });
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
  

  completeRace(raceId: string, raceTimeId: string, results: RaceResult[]): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.post(`${this.baseUrl}/${raceId}/complete`, { raceTimeId, results }, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }  

  cancelRace(raceId: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.baseUrl}/${raceId}/cancel`, {}, { headers, withCredentials: true });
  }

  uncancelRace(raceId: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.baseUrl}/${raceId}/uncancel`, {}, { headers, withCredentials: true });
  }

  signUpForRestream(raceId: string, restreamChannel: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/${raceId}/restream`, { restreamChannel }, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelRaceRestream(raceId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/${raceId}/cancel-restream`, {}, { headers, withCredentials: true })
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