import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CounterActions } from './counter.actions';
import { map, switchMap, timer } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * CounterEffects
 * Provides side effects for the Counter feature.
 * - incrementAsync: waits for a delay, then dispatches increment
 */
@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions) {}

  // PUBLIC_INTERFACE
  /** Effect that delays and then dispatches a standard increment action. */
  incrementAsync$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.incrementAsync),
      switchMap(({ delayMs }) => timer(delayMs ?? 500).pipe(map(() => CounterActions.increment())))
    )
  );
}
