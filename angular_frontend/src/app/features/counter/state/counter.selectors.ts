import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

/**
 * PUBLIC_INTERFACE
 * selectCounterState
 * Feature selector for the Counter state slice.
 */
export const selectCounterState = createFeatureSelector<CounterState>('counter');

/**
 * PUBLIC_INTERFACE
 * selectCounterValue
 * Selector to get the current counter numeric value.
 */
export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.value
);

/**
 * PUBLIC_INTERFACE
 * selectIsPositive
 * Selector indicating whether the counter value is greater than 0.
 */
export const selectIsPositive = createSelector(
  selectCounterValue,
  (value) => value > 0
);
