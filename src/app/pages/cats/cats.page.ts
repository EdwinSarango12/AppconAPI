import { Component, OnInit } from '@angular/core';
import { ApiService, CatImage } from '../../services/api.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
  standalone: false,
})
export class CatsPage implements OnInit {

  loading = false;
  catImage: CatImage | null = null;
  cataasImage: string = '';
  error: string = '';
  catGallery: CatImage[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCatImage();
  }

  loadCatImage() {
    this.loading = true;
    this.error = '';

    // Load from The Cat API
    this.apiService.getCatImage().subscribe({
      next: (cats) => {
        this.catImage = cats[0];
        if (this.catImage) {
          this.catGallery.unshift(this.catImage);
          if (this.catGallery.length > 6) {
            this.catGallery.pop();
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la imagen del gato. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });

    // Load from Cataas
    this.cataasImage = this.apiService.getCataasUrl();
  }

  refresh() {
    this.loadCatImage();
  }

  loadMoreCats() {
    this.apiService.getCatImage().subscribe({
      next: (cats) => {
        if (cats[0]) {
          this.catGallery.push(cats[0]);
        }
      },
      error: (err) => {
        console.error('Error loading more cats:', err);
      }
    });
  }

}
