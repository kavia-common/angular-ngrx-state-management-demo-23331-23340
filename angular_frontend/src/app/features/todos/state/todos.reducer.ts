import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { TodosActions } from './todos.actions';

/**
 * PUBLIC_INTERFACE
 * TodosState
 * Entity state for Todos with UI flags.
 */
export interface TodosState extends EntityState<Todo> {
  loaded: boolean;
  loading: boolean;
  error?: unknown;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (t) => t.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const initialState: TodosState = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
});

/**
 * PUBLIC_INTERFACE
 * todosReducer
 * Reducer to handle todos actions via EntityAdapter CRUD helpers.
 */
export const todosReducer = createReducer(
  initialState,

  // Load
  on(TodosActions.load, (state) => ({ ...state, loading: true, error: undefined })),
  on(TodosActions.loadSuccess, (state, { todos }) =>
    adapter.setAll(todos, { ...state, loading: false, loaded: true })),
  on(TodosActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(TodosActions.add, (state) => ({ ...state, loading: true, error: undefined })),
  on(TodosActions.addSuccess, (state, { todo }) =>
    adapter.addOne(todo, { ...state, loading: false })),
  on(TodosActions.addFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Toggle
  on(TodosActions.toggle, (state) => ({ ...state, loading: true, error: undefined })),
  on(TodosActions.toggleSuccess, (state, { todo }) =>
    adapter.upsertOne(todo, { ...state, loading: false })),
  on(TodosActions.toggleFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Remove
  on(TodosActions.remove, (state) => ({ ...state, loading: true, error: undefined })),
  on(TodosActions.removeSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })),
  on(TodosActions.removeFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

// Entity selectors
const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

// PUBLIC_INTERFACE
export const fromTodosEntity = {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
};
