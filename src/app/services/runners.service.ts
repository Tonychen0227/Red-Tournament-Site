import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RunnersService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  getRunners(): Observable<any[]> {    
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${this.baseUrl}/runners/`, { headers })
  }

  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.secretKey}`
    });

    return this.http.post<any>(`${this.baseUrl}/admin/add-user`, user, { headers, withCredentials: true });
  }
}