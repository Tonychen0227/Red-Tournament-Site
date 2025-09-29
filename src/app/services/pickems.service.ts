import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pickems } from '../interfaces/pickems';

@Injectable({
  providedIn: 'root'
})
export class PickemsService {

  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/pickems`;
  private secretKey = environment.secretKey;

  private pickems: Pickems | null = null;

  setPickems(data: Pickems) {
    this.pickems = data;
  }

  getPickems(): Pickems | null {
    return this.pickems;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }
  
  submitOneOffPicks(picksData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/submit-one-off`, picksData, { headers, withCredentials: true });
  }

  checkPickems(): Observable<Pickems> {
    const headers = this.getHeaders();
    return this.http.get<Pickems>(`${this.baseUrl}`, { headers, withCredentials: true });
  }

  getPickemsByUserId(userId: string): Observable<Pickems> {
    const headers = this.getHeaders();
    return this.http.get<Pickems>(`${this.baseUrl}/${userId}`, { headers, withCredentials: true });
  }
  
  getLeaderboard(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/leaderboard`, { headers, withCredentials: true });
  }

  submitRoundWinners(selectedWinners: string[]): Observable<any> {
    const headers = this.getHeaders();

    const payload = {
      selectedWinners
    };

    return this.http.post(`${this.baseUrl}/submit-round-picks`, payload, { headers, withCredentials: true });
  }

  getAllStats(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/stats/all`, { headers, withCredentials: true });
  }

  getFavorites(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/stats/favorites`, { headers, withCredentials: true });
  }

  recalibratePickems(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${environment.apiUrl}/admin/recalibrate-pickems`, {}, { headers, withCredentials: true });
  }

  previewRecalibratePickems(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${environment.apiUrl}/admin/recalibrate-pickems-preview`, {}, { headers, withCredentials: true });
  }
}