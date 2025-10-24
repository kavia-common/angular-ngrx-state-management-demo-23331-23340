import { Routes, CanDeactivateFn } from '@angular/router';
import { AppShellComponent } from './layout/shell/app-shell.component';
import { unsavedChangesGuard } from './features/todos/guards/unsaved-changes.guard';

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
        canDeactivate: [unsavedChangesGuard],
        title: 'Todos',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
        title: 'Not Found',
      },
    ],
  },
];
