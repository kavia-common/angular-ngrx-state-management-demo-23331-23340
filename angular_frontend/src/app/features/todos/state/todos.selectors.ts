import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState, fromTodosEntity } from './todos.reducer';

/**
 * PUBLIC_INTERFACE
 * selectTodosState
 * Feature selector for todos slice.
 */
export const selectTodosState = createFeatureSelector<TodosState>('todos');

// PUBLIC_INTERFACE
/** Returns all todos array. */
export const selectAllTodos = createSelector(selectTodosState, fromTodosEntity.selectAll);

// PUBLIC_INTERFACE
/** Returns total count. */
export const selectTodosTotal = createSelector(selectTodosState, fromTodosEntity.selectTotal);

// PUBLIC_INTERFACE
/** Returns loading flag. */
export const selectTodosLoading = createSelector(selectTodosState, (s) => s.loading);

// PUBLIC_INTERFACE
/** Returns loaded flag. */
export const selectTodosLoaded = createSelector(selectTodosState, (s) => s.loaded);

// PUBLIC_INTERFACE
/** Returns only completed todos. */
export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter(t => t.completed));

// PUBLIC_INTERFACE
/** Returns only active (not completed) todos. */
export const selectActiveTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter(t => !t.completed));
