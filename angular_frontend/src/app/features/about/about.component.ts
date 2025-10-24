import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-about',
  template: `
    <section class="app-surface rounded-lg shadow-sm" style="padding:1.25rem;margin:1rem;">
      <header class="header-gradient rounded" style="padding:1rem;margin-bottom:1rem;">
        <h2 style="color:var(--color-primary);">About</h2>
        <p style="opacity:.8;">Angular + NgRx State Management Demo</p>
      </header>

      <p style="margin-bottom:1rem;">
        This demo showcases recommended patterns for building Angular applications with NgRx:
        feature-based state slices, selectors for derived data, effects for async operations,
        and a clean standalone-component architecture.
      </p>

      <ul style="margin-left:1rem; line-height:1.8;">
        <li>Angular 19 standalone components and routing</li>
        <li>NgRx Store, Effects, Entity, and Router Store</li>
        <li>Mock services and simple UI with the Ocean Professional theme</li>
      </ul>

      <p style="margin-top:1rem; opacity:.85;">
        Use the sidebar to navigate between the Dashboard, Counter, and Todos pages.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
