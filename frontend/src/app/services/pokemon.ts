import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, NEVER } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {
  private apiURL = environment.apiUrl;
  private getBodyOfResponseOrRedirect<T>(
    responseObservable: Observable<any>
  ): Observable<T> {
    return responseObservable.pipe(
      catchError(error => {
        if (!!error.status && error.status === 401) {
          this.router.navigate(['auth/login'])
          return NEVER;            // <-- never emit after the redirect
        }
        if (!!error.status && error.status === 403) {
          this.router.navigate(['auth/login'])
          return NEVER;            // <-- never emit after the redirect
        }
        // const err = new Error('test');
        // throwError(() => err)
        console.log(error)
        return error
        // return throwError(error);  // <-- pass on the error if it isn't 401
      }),
      map(response =>  response.body)
    );
  }
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPokemonAll(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL+"/api/pokemon/all");
  }

  getPokemonMain(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL+"/api/pokemon/main");
  }

  getPokemonShiny(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL+"/api/pokemon/shiny");
  }

  getPokemonLucky(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL+"/api/pokemon/lucky");
  }

  getHundo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/hundo`);
  }

  updatePokemon(id: any, trainer: any, data: any) : Observable<any> {
    return this.http.patch(`${this.apiURL}/api/pokemon/${id}/${trainer}`, data)
  }

  getTrainerShiny(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/shiny`);
  }

  getTrainerLucky(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/lucky`);
  }

  getTrainerPerfect(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/perfect`)
  }

  getXXL(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/xxl`);
  }

  getXXS(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/xxs`);
  }
  getTrainerCostume(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trainer/costume`);
  }

  getTrash2(name1:any,name2:any,region:any,gender:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trash/hundo2?name1=${name1}&name2=${name2}&gender=${gender}&region=${region}`);
  }

  getTrash3(name1:any,name2:any,name3:any,region:any,gender:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trash/hundo3?name1=${name1}&name2=${name2}&name3=${name3}&gender=${gender}&region=${region}`);
  }

  getTrash4(name1:any,name2:any,name3:any,name4:any,region:any,gender:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trash/hundo4?name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}&gender=${gender}&region=${region}`);
  }

  getHundoHave(name:any,region:any,gender:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/hundo?search=have&name=${name}&gender=${gender}&region=${region}`);
  }
  getHundoWant(name:any,region:any,gender:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/hundo?search=want&name=${name}&gender=${gender}&region=${region}`);
  }
  getTradeHundoExclude(name:any,region:any,gender:any, exclude:any): Observable<any[]> {
    //var exclude = exclude.join()
    //exclude = 'test'
    return this.http.get<any[]>(`${this.apiURL}/api/trade/hundo/exclude?search=want&name=${name}&gender=${gender}&region=${region}&exclude=${exclude}`);
  }
  getTradeXXL(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/xxl?name=${trainer}&search=${search}`);
  }

  getTradeXXS(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/xxs?name=${trainer}&search=${search}`);
  }

  getView(trainer:any, dex:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/view?name=${trainer}&dex=${dex}`);
  }

  getViewCostume(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/view/costume?name=${trainer}&search=${search}`);
  }

  getViewLucky(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/view/lucky?name=${trainer}&search=${search}`);
  }

  getViewPerfect(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/view/perfect?name=${trainer}&search=${search}`);
  }
  getTradeShiny(trainer:any, search:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/trade/shiny?name=${trainer}&search=${search}`);
  }
}
