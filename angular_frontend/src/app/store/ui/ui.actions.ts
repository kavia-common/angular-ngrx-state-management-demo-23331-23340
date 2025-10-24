import { createActionGroup, props } from '@ngrx/store';

/**
 * PUBLIC_INTERFACE
 * UiActions
 * Action group for global UI Preferences (theme and sidebar).
 */
export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    /** Toggle theme between 'light' and 'dark'. Optionally force a specific mode. */
    'toggle theme': props<{ mode?: 'light' | 'dark' }>(),
    /** Toggle the sidebar collapsed/expanded state. Optionally force a specific value. */
    'toggle sidebar': props<{ collapsed?: boolean }>(),
    /** Set theme mode explicitly. */
    'set theme': props<{ mode: 'light' | 'dark' }>(),
    /** Set sidebar collapsed explicitly. */
    'set sidebar collapsed': props<{ collapsed: boolean }>(),
  },
});
