import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }
  
  private baseUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  getStandings(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.baseUrl}/tournament/standings`,  { headers });
  }

  getCurrentRound(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/tournament/round`, { headers });
  }

  endRound(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/tournament/end-round`, null, { headers, withCredentials: true });
  }
}