import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Stats } from '../interfaces/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/stats`;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  fetchStats(): Observable<Stats> {
    const headers = this.getHeaders();
    return this.http.get<Stats>(`${this.baseUrl}`, { headers, withCredentials: true });
  }
}
