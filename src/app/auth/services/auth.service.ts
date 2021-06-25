import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl:string = environment.baseUrl; 
  private _auth:Auth | undefined;
  
  constructor(private http:HttpClient) { }

  get auth() {
    return {...this._auth};
  }


  login():Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
          .pipe(
            tap(auth => this._auth=auth )
            )
  }
  
}
