import { ActionReducer, Action } from '@ngrx/store';
import { isDevMode } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * debugMetaReducer
 * Meta-reducer that logs actions and next state in development.
 */
export function debugMetaReducer<State, A extends Action = Action>(reducer: ActionReducer<State, A>): ActionReducer<State, A> {
  return (state: State | undefined, action: A): State => {
    if (isDevMode()) {
      console.log('%c NgRx Action', 'color:#2563EB;font-weight:bold;', action);
    }
    return reducer(state, action);
  };
}
