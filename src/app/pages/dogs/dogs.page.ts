import { Component, OnInit } from '@angular/core';
import { ApiService, DogImage } from '../../services/api.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
  standalone: false,
})
export class DogsPage implements OnInit {

  loading = false;
  dogImage: DogImage | null = null;
  error: string = '';
  dogGallery: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDogImage();
  }

  loadDogImage() {
    this.loading = true;
    this.error = '';

    this.apiService.getDogImage().subscribe({
      next: (dog) => {
        this.dogImage = dog;
        if (dog.message) {
          this.dogGallery.unshift(dog.message);
          if (this.dogGallery.length > 6) {
            this.dogGallery.pop();
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la imagen del perro. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  refresh() {
    this.loadDogImage();
  }

  loadMoreDogs() {
    this.apiService.getDogImage().subscribe({
      next: (dog) => {
        if (dog.message) {
          this.dogGallery.push(dog.message);
        }
      },
      error: (err) => {
        console.error('Error loading more dogs:', err);
      }
    });
  }

  getBreedFromUrl(url: string): string {
    const parts = url.split('/');
    const breedIndex = parts.indexOf('breeds') + 1;
    if (breedIndex > 0 && breedIndex < parts.length) {
      return parts[breedIndex].replace('-', ' ').toUpperCase();
    }
    return 'RANDOM';
  }

}
