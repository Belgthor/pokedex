import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL+"/posts");
  }

  createPost(data: Post): Observable<any>{
    return this.http.post(this.apiURL+"/posts", data);
  }

  findPost(id: string): Observable<any>{
    return this.http.get(this.apiURL+"/posts/" + id);
  }

  updatePost(id:string, data: Post): Observable<any>{
    return this.http.put(this.apiURL+"/posts/" + id, data);
  }

  deletePost(id: string): Observable<any>{
    return this.http.delete(this.apiURL+"/posts/" + id);
  }
}