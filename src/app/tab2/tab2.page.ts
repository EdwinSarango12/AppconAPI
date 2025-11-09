import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  loading = false;
  joke: any = null;
  catImage: any = null;
  dogImage: any = null;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCombinedData();
  }

  loadCombinedData() {
    this.loading = true;
    this.error = '';
    this.joke = null;
    this.catImage = null;
    this.dogImage = null;

    this.apiService.getCombinedData().subscribe({
      next: (data) => {
        this.joke = data.joke;
        this.catImage = data.cat;
        this.dogImage = data.dog;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  getJokeText(): string {
    if (!this.joke || this.joke.error) {
      return 'No se pudo cargar el chiste';
    }
    if (this.joke.type === 'single') {
      return this.joke.joke;
    } else {
      return `${this.joke.setup}\n\n${this.joke.delivery}`;
    }
  }

  refresh() {
    this.loadCombinedData();
  }

}
