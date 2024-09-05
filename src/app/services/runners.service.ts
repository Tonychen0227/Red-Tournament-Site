import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunnersService {

  private runnersUrl = 'http://localhost:3000/api/runners';

  constructor(private http: HttpClient) { }

  getRunners(): Observable<any[]> {
    return this.http.get<any[]>(this.runnersUrl);
  }
}