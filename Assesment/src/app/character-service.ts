import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://swapi.dev/api';
  constructor(private http: HttpClient) {
    
  }

 
  getSpecies(): Observable<Species[]> {
    return this.http.get<ApiResponse<Species>>(`${this.apiUrl}/species`).pipe(
      map((response: ApiResponse<Species>) => response.results)
    );
  }

  getVehicle(): Observable<Vechicle[]> {
    return this.http.get<ApiResponse<Vechicle>>(`${this.apiUrl}/vehicles`).pipe(
      map((response: ApiResponse<Vechicle>) => response.results)
    );
  }

  getMovies(): Observable<any[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/films`).pipe(
      map((response: ApiResponse<any>) => response.results)
    );
  }

  getStarShips(): Observable<any[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/starships`).pipe(
      map((response: ApiResponse<any>) => response.results)
    );
  }


  getCharcterSpecificData(url: any): Observable<any[]> {
    return this.http.get<any>(url);
  }

  getPeople(): Observable<Character[]> {
    console.log('Fetching characters from API...');
    return this.http.get<ApiResponse<Character>>(`${this.apiUrl}/people`).pipe(
      map((response: ApiResponse<Character>) => {
        console.log('API Response:', response);
        return response.results;
      })
    );
  }
  
}

interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
export class Character {
  name!: string;
  birth_year!: string;
  films!: string[];
  species!: string[];
  starships!: string[];
  url!: string;
}

export class Species {
  name!: string;
}

export class Vechicle {
  vechicleName!: string;
}
