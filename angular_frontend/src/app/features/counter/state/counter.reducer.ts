import { createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

/**
 * PUBLIC_INTERFACE
 * CounterState
 * Shape of the Counter feature state.
 */
export interface CounterState {
  value: number;
}

export const initialState: CounterState = {
  value: 0,
};

/**
 * PUBLIC_INTERFACE
 * counterReducer
 * Reducer function to handle Counter actions.
 */
export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({ ...state, value: state.value + 1 })),
  on(CounterActions.decrement, (state) => ({ ...state, value: state.value - 1 })),
  on(CounterActions.reset, () => initialState),
);
