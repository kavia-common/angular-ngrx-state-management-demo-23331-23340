import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard',
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
      {
        path: 'todos',
        loadComponent: () =>
          import('./features/todos/pages/todos.page').then((m) => m.TodosPageComponent),
        title: 'Todos',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
