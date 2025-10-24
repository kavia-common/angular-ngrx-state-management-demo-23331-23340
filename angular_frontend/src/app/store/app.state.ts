import { RouterReducerState } from '@ngrx/router-store';
import { CounterState } from '../features/counter/state/counter.reducer';
import { TodosState } from '../features/todos/state/todos.reducer';

/**
 * PUBLIC_INTERFACE
 * AppState
 * Root state interface for the application.
 */
export interface AppState {
  router: RouterReducerState;
  counter: CounterState;
  todos: TodosState;
}
