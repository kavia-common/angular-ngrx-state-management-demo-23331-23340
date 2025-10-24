import { Component } from '@angular/core';
import { AppCardComponent } from '../../shared/ui/card/card.component';
import { RouterLink } from '@angular/router';
import { AppButtonComponent } from '../../shared/ui/button/button.component';

/**
 * PUBLIC_INTERFACE
 * DashboardComponent
 * Simple landing dashboard with quick links to features.
 */
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [AppCardComponent, RouterLink, AppButtonComponent],
  template: `
    <app-card title="Welcome" subtitle="Angular + NgRx Demo using the Ocean Professional theme">
      <p style="margin-bottom:1rem;">Explore the demo features using the links below.</p>
      <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
        <a routerLink="/counter"><app-button>Counter</app-button></a>
        <a routerLink="/todos"><app-button variant="secondary">Todos</app-button></a>
        <a routerLink="/about"><app-button variant="ghost">About</app-button></a>
      </div>
    </app-card>
  `
})
export class DashboardComponent {}
