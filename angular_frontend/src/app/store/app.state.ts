import { RouterReducerState } from '@ngrx/router-store';

/**
 * PUBLIC_INTERFACE
 * AppState
 * Root state interface for the application.
 */
export interface AppState {
  router: RouterReducerState;
}
