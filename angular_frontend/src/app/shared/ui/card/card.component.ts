import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * AppCardComponent
 * A reusable surface container with optional header and footer sections.
 */
@Component({
  standalone: true,
  selector: 'app-card',
  imports: [NgIf],
  template: `
    <section class="app-surface" [style.padding.px]="padding" [class.rounded-lg]="rounded" [class.shadow-sm]="shadow">
      <header *ngIf="title" class="card-header header-gradient rounded" style="padding:.75rem;margin:-.5rem -0.5rem 1rem;">
        <h3 style="color:var(--color-primary);">{{ title }}</h3>
        <p *ngIf="subtitle" style="opacity:.8;">{{ subtitle }}</p>
      </header>
      <ng-content />
      <footer *ngIf="footer" style="margin-top:1rem; opacity:.8;">
        {{ footer }}
      </footer>
    </section>
  `
})
export class AppCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() footer?: string;
  @Input() padding = 20;
  @Input() rounded = true;
  @Input() shadow = true;
}
