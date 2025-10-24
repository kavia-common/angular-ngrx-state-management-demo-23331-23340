import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * NotFoundComponent
 * Simple 404 page component to show when no routes match.
 */
@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="app-surface rounded-lg shadow-sm" style="padding:1.25rem;margin:1rem; text-align:center;">
      <div class="header-gradient rounded" style="padding:1rem;margin-bottom:1rem;">
        <h2 style="color:var(--color-primary);">404 — Not Found</h2>
        <p style="opacity:.8;">The page you’re looking for doesn’t exist.</p>
      </div>

      <p style="margin-bottom:1rem;">You can go back to the dashboard or explore other sections.</p>
      <a routerLink="/" class="btn-primary" style="text-decoration:none; display:inline-block;">Go to Dashboard</a>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
