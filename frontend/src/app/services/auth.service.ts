import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
interface AuthResponse{
  token:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl=`${environment.apiUrl}/api`;
  token: string|null = null;

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  register(name: string, password: string){
    return this.http.post(`${this.apiUrl}/auth/register`, {name, password});
  }


  logout(){
    this.token=null;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  login(name: string, password: string){
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, {name, password});
  }

  changePW(name: string, password: string, newPassword: string){
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/changepw`, {name, password, newPassword});
  }

  saveToken(token: string){
    this.token = token;
    localStorage.setItem('jwt', token);
  }

  saveName(name: string){
    localStorage.setItem('name', name)
  }

  loadToken(){
    console.log('loadToken')
    const token = localStorage.getItem('jwt');
    console.log(token)
    console.log(this.isTokenExpired(token))
    if (token && !this.isTokenExpired(token)) {
      return token
    }else if(this.token){
      return this.token
    }else{
      return
    }

  }

  isAuthenticated(){
    console.log('isAuthenticated')
    return !!this.loadToken();
  }
  isTokenExpired(token: any) {
  try {
    if(token){
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    }else{
      return true
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat as expired if decoding fails
  }
}
}