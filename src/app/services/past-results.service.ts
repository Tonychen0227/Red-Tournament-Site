import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PastResults } from '../interfaces/past-results';

@Injectable({
  providedIn: 'root'
})
export class PastResultsService {

  constructor(private http: HttpClient) { }
  
  private baseUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  // Get all past results
  getAllPastResults(): Observable<PastResults[]> {
    const headers = this.getHeaders();
    return this.http.get<PastResults[]>(`${this.baseUrl}/past-results`, { headers });
  }
}