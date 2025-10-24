import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

/**
 * PUBLIC_INTERFACE
 * TodosActions
 * Action group for Todos feature.
 */
export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    load: emptyProps(),
    'load success': props<{ todos: Todo[] }>(),
    'load failure': props<{ error: unknown }>(),

    add: props<{ title: string }>(),
    'add success': props<{ todo: Todo }>(),
    'add failure': props<{ error: unknown }>(),

    toggle: props<{ id: string }>(),
    'toggle success': props<{ todo: Todo }>(),
    'toggle failure': props<{ error: unknown }>(),

    remove: props<{ id: string }>(),
    'remove success': props<{ id: string }>(),
    'remove failure': props<{ error: unknown }>(),
  },
});
