import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { debugMetaReducer } from './meta-reducers/debug.reducer';

/**
 * Reducers map for the root state.
 * Note: router reducer is added in provideStore configuration to ensure proper DI order for standalone setup.
 */
export const reducers: ActionReducerMap<Partial<AppState>> = {
  // other feature reducers will be added here
};

/**
 * Global meta-reducers for development diagnostics.
 */
export const metaReducers: MetaReducer[] = [
  debugMetaReducer
];
