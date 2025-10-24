import { createReducer, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

/**
 * PUBLIC_INTERFACE
 * UiState
 * Global UI preferences state stored at 'ui' feature key.
 */
export interface UiState {
  themeMode: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

export const initialUiState: UiState = {
  themeMode: 'light',
  sidebarCollapsed: false,
};

/**
 * PUBLIC_INTERFACE
 * uiReducer
 * Handles UI preference mutations.
 */
export const uiReducer = createReducer(
  initialUiState,
  on(UiActions.toggleTheme, (state, { mode }) => ({
    ...state,
    themeMode: mode ?? (state.themeMode === 'light' ? 'dark' : 'light'),
  })),
  on(UiActions.toggleSidebar, (state, { collapsed }) => ({
    ...state,
    sidebarCollapsed: typeof collapsed === 'boolean' ? collapsed : !state.sidebarCollapsed,
  })),
  on(UiActions.setTheme, (state, { mode }) => ({ ...state, themeMode: mode })),
  on(UiActions.setSidebarCollapsed, (state, { collapsed }) => ({ ...state, sidebarCollapsed: collapsed })),
);
