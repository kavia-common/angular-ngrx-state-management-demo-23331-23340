import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions } from './todos.actions';
import { TodosService } from '../services/todos.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * TodosEffects
 * Handles async operations for todos via TodosService.
 */
@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private service: TodosService) {}

  // PUBLIC_INTERFACE
  /** Load all todos on TodosActions.load */
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        this.service.getAll().pipe(
          map((todos) => TodosActions.loadSuccess({ todos })),
          catchError((error) => of(TodosActions.loadFailure({ error })))
        )
      )
    )
  );

  // PUBLIC_INTERFACE
  /** Add a new todo */
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.add),
      mergeMap(({ title }) =>
        this.service.add(title).pipe(
          map((todo) => TodosActions.addSuccess({ todo })),
          catchError((error) => of(TodosActions.addFailure({ error })))
        )
      )
    )
  );

  // PUBLIC_INTERFACE
  /** Toggle a todo completion */
  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.toggle),
      mergeMap(({ id }) =>
        this.service.toggle(id).pipe(
          map((todo) => {
            if (!todo) throw new Error('Todo not found');
            return TodosActions.toggleSuccess({ todo });
          }),
          catchError((error) => of(TodosActions.toggleFailure({ error })))
        )
      )
    )
  );

  // PUBLIC_INTERFACE
  /** Remove a todo */
  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.remove),
      mergeMap(({ id }) =>
        this.service.remove(id).pipe(
          map((removedId) => TodosActions.removeSuccess({ id: removedId })),
          catchError((error) => of(TodosActions.removeFailure({ error })))
        )
      )
    )
  );
}
