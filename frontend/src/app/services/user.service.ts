import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = environment.apiUrl+'/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainer`);
  }
  
}