import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../state';
import { selectCounterValue, selectIsPositive } from '../state';
import { CounterControlsComponent } from '../components/counter-controls.component';
import { Observable } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * CounterPageComponent
 * Feature page that shows the current counter value and provides controls.
 */
@Component({
  standalone: true,
  selector: 'app-counter-page',
  imports: [AsyncPipe, NgIf, CounterControlsComponent],
  template: `
    <section class="app-surface rounded-lg shadow-sm" style="padding:1.25rem;margin:1rem;">
      <header class="header-gradient rounded" style="padding:1rem;margin-bottom:1rem;">
        <h2 style="color:var(--color-primary); margin-bottom:.25rem;">Counter</h2>
        <p class="text-muted">Simple demonstration using NgRx Store, Effects, and Selectors.</p>
      </header>

      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
        <div style="font-size:2rem;font-weight:600;min-width:4ch;text-align:center;">
          {{ value$ | async }}
        </div>
        <small *ngIf="(isPositive$ | async) === false" style="color:var(--color-error);">Value is not positive</small>
      </div>

      <app-counter-controls
        (increment)="onIncrement()"
        (decrement)="onDecrement()"
        (reset)="onReset()"
        (incrementAsync)="onIncrementAsync()"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {
  private store = inject(Store);

  // Initialize as Observables to avoid undefined access during SSR prerender
  value$: Observable<number> = this.store.select(selectCounterValue);
  isPositive$: Observable<boolean> = this.store.select(selectIsPositive);

  // PUBLIC_INTERFACE
  /** Dispatches increment action. */
  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }
  // PUBLIC_INTERFACE
  /** Dispatches decrement action. */
  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }
  // PUBLIC_INTERFACE
  /** Dispatches reset action. */
  onReset() {
    this.store.dispatch(CounterActions.reset());
  }
  // PUBLIC_INTERFACE
  /** Dispatches incrementAsync with default delay. */
  onIncrementAsync() {
    this.store.dispatch(CounterActions.incrementAsync({ delayMs: 600 }));
  }
}
