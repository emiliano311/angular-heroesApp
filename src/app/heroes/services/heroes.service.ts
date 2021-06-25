import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interface/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl:string =environment.baseUrl;
  constructor(private http:HttpClient) { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(termino:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${termino}`);
  }

  getSugerencias(termino:string):Observable<Heroe[]>{

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(hero:Heroe):Observable<Heroe>{

    return this.http.post<Heroe>(`${this.baseUrl}/heroes`,hero);
  }

  actualizarHeroe(hero:Heroe):Observable<Heroe>{

    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  borrarHeroe(id:string):Observable<any>{

    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }
}
