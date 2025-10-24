import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

/**
 * PUBLIC_INTERFACE
 * selectUiState
 * Feature selector for the global 'ui' slice.
 */
export const selectUiState = createFeatureSelector<UiState>('ui');

/**
 * PUBLIC_INTERFACE
 * selectThemeMode
 * Returns the current theme mode: 'light' or 'dark'.
 */
export const selectThemeMode = createSelector(
  selectUiState,
  (ui) => ui.themeMode
);

/**
 * PUBLIC_INTERFACE
 * selectIsDarkMode
 * True when the theme mode is 'dark'.
 */
export const selectIsDarkMode = createSelector(
  selectThemeMode,
  (mode) => mode === 'dark'
);

/**
 * PUBLIC_INTERFACE
 * selectSidebarCollapsed
 * Returns whether the sidebar is currently collapsed.
 */
export const selectSidebarCollapsed = createSelector(
  selectUiState,
  (ui) => ui.sidebarCollapsed
);
