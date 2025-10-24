import { AsyncPipe, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppCardComponent } from '../../shared/ui/card/card.component';
import { AppButtonComponent } from '../../shared/ui/button/button.component';
import { selectCounterValue } from '../counter/state';
import { selectTodosTotal } from '../todos/state';
import { Observable } from 'rxjs';
import { DebounceClickDirective } from '../../shared/directives/debounce-click.directive';

/**
 * PUBLIC_INTERFACE
 * DashboardComponent
 * Dashboard showing quick links and summary cards fed by NgRx selectors.
 */
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [AppCardComponent, RouterLink, AppButtonComponent, AsyncPipe, NgIf, DebounceClickDirective],
  template: `
    <section style="display:flex; flex-direction:column; gap:1rem; margin:1rem;">
      <app-card title="Welcome" subtitle="Angular + NgRx Demo using the Ocean Professional theme">
        <p style="margin-bottom:1rem;">Explore the demo features using the links below.</p>
        <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
          <a routerLink="/counter"><app-button>Counter</app-button></a>
          <a routerLink="/todos"><app-button variant="secondary">Todos</app-button></a>
          <a routerLink="/about"><app-button variant="ghost">About</app-button></a>
          <button appDebounceClick [debounceTime]="350" (debounceClick)="noop()" class="btn-primary" type="button" title="Debounced click example">Debounced</button>
        </div>
      </app-card>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
        <app-card [padding]="16" [rounded]="true" [shadow]="true" title="Counter value">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-size:.85rem; opacity:.8;">Current</div>
              <div style="font-size:2rem; font-weight:700; color:var(--color-primary);">
                {{ counter$ | async }}
              </div>
            </div>
            <span style="font-size:1.5rem;">🔢</span>
          </div>
        </app-card>

        <app-card [padding]="16" [rounded]="true" [shadow]="true" title="Todos">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-size:.85rem; opacity:.8;">Total items</div>
              <div style="font-size:2rem; font-weight:700; color:var(--color-secondary);">
                {{ todosTotal$ | async }}
              </div>
            </div>
            <span style="font-size:1.5rem;">📝</span>
          </div>
        </app-card>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private store = inject(Store);
  counter$: Observable<number> = this.store.select(selectCounterValue);
  todosTotal$: Observable<number> = this.store.select(selectTodosTotal);

  // PUBLIC_INTERFACE
  /** No-op handler to demonstrate debounce-click in action on the dashboard. */
  noop() {}
}
