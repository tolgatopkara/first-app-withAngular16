import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = []

export const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    title: 'Home'
  },
  {
    path: 'details/:id',
    loadComponent : () =>   import('./details/details.component').then(m => m.DetailsComponent),
    title: 'Details'
  }

];
