import { RouterReducerState } from '@ngrx/router-store';
import { CounterState } from '../features/counter/state/counter.reducer';

/**
 * PUBLIC_INTERFACE
 * AppState
 * Root state interface for the application.
 */
export interface AppState {
  router: RouterReducerState;
  counter: CounterState;
}
