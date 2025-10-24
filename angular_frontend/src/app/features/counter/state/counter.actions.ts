import { createActionGroup, emptyProps, props } from '@ngrx/store';

/**
 * PUBLIC_INTERFACE
 * Counter Actions
 * Defines the actions available for the Counter feature.
 */
export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    increment: emptyProps(),
    decrement: emptyProps(),
    reset: emptyProps(),
    incrementAsync: props<{ delayMs?: number }>(),
  },
});
