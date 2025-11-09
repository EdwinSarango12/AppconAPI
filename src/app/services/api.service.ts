import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: any;
  id: number;
  safe: boolean;
  lang: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DogImage {
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any?lang=es';
  private catApiUrl = 'https://api.thecatapi.com/v1/images/search';
  private dogApiUrl = 'https://dog.ceo/api/breeds/image/random';
  private cataasUrl = 'https://cataas.com/cat';

  constructor(private http: HttpClient) { }

  // Joke API
  getJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.jokeApiUrl);
  }

  // Cat API
  getCatImage(): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(this.catApiUrl);
  }

  // Dog API
  getDogImage(): Observable<DogImage> {
    return this.http.get<DogImage>(this.dogApiUrl);
  }

  // Cataas - Returns URL directly
  getCataasUrl(): string {
    return `${this.cataasUrl}?timestamp=${new Date().getTime()}`;
  }

  // Combined API call
  getCombinedData(): Observable<any> {
    return new Observable(observer => {
      const result: any = {};
      let completed = 0;
      const total = 3;

      this.getJoke().subscribe({
        next: (joke) => {
          result.joke = joke;
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        },
        error: (err) => {
          result.joke = { error: true, message: 'Error al cargar el chiste' };
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        }
      });

      this.getCatImage().subscribe({
        next: (cat) => {
          result.cat = cat[0];
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        },
        error: (err) => {
          result.cat = { error: true, message: 'Error al cargar imagen de gato' };
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        }
      });

      this.getDogImage().subscribe({
        next: (dog) => {
          result.dog = dog;
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        },
        error: (err) => {
          result.dog = { error: true, message: 'Error al cargar imagen de perro' };
          completed++;
          if (completed === total) {
            observer.next(result);
            observer.complete();
          }
        }
      });
    });
  }
}
