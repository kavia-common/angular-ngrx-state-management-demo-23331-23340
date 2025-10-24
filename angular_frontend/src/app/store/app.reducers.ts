import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { debugMetaReducer } from './meta-reducers/debug.reducer';
import { localStorageUiMetaReducer } from './meta-reducers/localstorage.reducer';

/**
 * Reducers map for the root state.
 * Note: router reducer is added in provideStore configuration to ensure proper DI order for standalone setup.
 */
export const reducers: ActionReducerMap<Partial<AppState>> = {
  // other feature reducers will be added here
};

/**
 * Global meta-reducers order: localStorage first to rehydrate, then debug for logging in dev.
 */
export const metaReducers: MetaReducer[] = [
  localStorageUiMetaReducer,
  debugMetaReducer
];
