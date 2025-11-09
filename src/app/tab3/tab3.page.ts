import { Component, OnInit } from '@angular/core';
import { ApiService, Joke } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  loading = false;
  joke: Joke | null = null;
  error: string = '';
  jokeHistory: Joke[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadJoke();
  }

  loadJoke() {
    this.loading = true;
    this.error = '';

    this.apiService.getJoke().subscribe({
      next: (joke) => {
        this.joke = joke;
        if (!joke.error) {
          this.jokeHistory.unshift(joke);
          if (this.jokeHistory.length > 10) {
            this.jokeHistory.pop();
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el chiste. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  getJokeText(joke: Joke): string {
    if (joke.type === 'single') {
      return joke.joke || '';
    } else {
      return `${joke.setup}\n\n${joke.delivery}`;
    }
  }

  refresh() {
    this.loadJoke();
  }

}
