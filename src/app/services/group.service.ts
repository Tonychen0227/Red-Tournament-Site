import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  private baseUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.secretKey}`);
  }

  createGroup(pot1UserId: string, pot2UserId: string, pot3UserId?: string): Observable<any> {
    const headers = this.getHeaders();
    const body: any = {
      pot1UserId,
      pot2UserId
    };
    if (pot3UserId && pot3UserId.trim() !== '') {
      body.pot3UserId = pot3UserId;
    }

    return this.http.post<any>(`${this.baseUrl}/groups`, body, { headers, withCredentials: true })
      .pipe(
        tap(response => {
          // console.log('Group created successfully:', response);
          // Optionally, trigger other actions like refreshing group lists
        }),
        catchError(this.handleError('createGroup'))
      );
  }


  // getAllGroups(): Observable<any> {
  //   const headers = this.getHeaders();

  //   return this.http.get<any>(`${this.baseUrl}/groups`, { headers, withCredentials: true })
  //     .pipe(
  //       catchError(this.handleError('getAllGroups'))
  //     );
  // }

  getAllGroups(): Observable<any> {
    const headers = this.getHeaders();
  
    return this.http.get<any>(`${this.baseUrl}/groups`, { headers, withCredentials: true })
      .pipe(
        tap((response) => console.log(response)),  // Log the response
        catchError(this.handleError('getAllGroups'))
      );
  }

  getGroupCount(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.baseUrl}/groups/count`, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError('getGroupCount'))
      );
  }

  getCurrentUserGroup(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(`${this.baseUrl}/groups/user/current`, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError('getCurrentUserGroup'))
      );
  }
  
  private handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);
      throw error;
    };
  }
}