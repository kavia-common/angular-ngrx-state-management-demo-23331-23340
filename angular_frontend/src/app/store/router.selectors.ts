import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { RouterReducerState } from '@ngrx/router-store';

const selectRouter = (state: AppState) => state.router as RouterReducerState<any>;

// PUBLIC_INTERFACE
/** Selects current route params from the router state tree. */
export const selectRouteParams = createSelector(selectRouter, (router) => {
  const snapshot = router?.state;
  return snapshot?.root?.firstChild?.params ?? {};
});

// PUBLIC_INTERFACE
/** Selects current query params from the router state tree. */
export const selectQueryParams = createSelector(selectRouter, (router) => {
  const snapshot = router?.state;
  return snapshot?.root?.queryParams ?? {};
});
