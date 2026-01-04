import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Trainer {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrainer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/trainer');
  }
  getOneTrainer(name: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/${name}`);
  }
  postlogin(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiURL}/api/trainer/signin`, data);
  }
}
