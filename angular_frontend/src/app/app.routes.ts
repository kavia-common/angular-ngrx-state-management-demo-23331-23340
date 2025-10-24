import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    title: 'Home'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'About',
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./features/counter/pages/counter.page').then((m) => m.CounterPageComponent),
    title: 'Counter',
  },
  { path: '**', redirectTo: '' },
];
