import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  apiOptions = [
    {
      title: 'APIs Combinadas',
      description: 'Chiste + Gato + Perro',
      icon: 'apps-outline',
      color: 'primary',
      route: '/tabs/tab2'
    },
    {
      title: 'Chistes',
      description: 'Chistes aleatorios en español',
      icon: 'happy-outline',
      color: 'warning',
      route: '/tabs/tab3'
    },
    {
      title: 'Gatos',
      description: 'Imágenes aleatorias de gatos',
      icon: 'paw-outline',
      color: 'success',
      route: '/tabs/cats'
    },
    {
      title: 'Perros',
      description: 'Imágenes aleatorias de perros',
      icon: 'paw-outline',
      color: 'tertiary',
      route: '/tabs/dogs'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
