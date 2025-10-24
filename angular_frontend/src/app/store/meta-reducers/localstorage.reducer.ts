import { Action, ActionReducer } from '@ngrx/store';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * localStorageUiMetaReducer
 * Meta-reducer that persists the 'ui' slice (themeMode, sidebarCollapsed) to localStorage on the browser.
 * - SSR-safe: guarded by isPlatformBrowser checks and feature-detection for globalThis/localStorage.
 * - On initialization (state === undefined), it will attempt to rehydrate the UI slice from storage.
 */
export function localStorageUiMetaReducer<State extends { ui?: any }, A extends Action = Action>(
  reducer: ActionReducer<State, A>
): ActionReducer<State, A> {
  // Late-injection pattern to safely access platform id
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);
  const storageKey = 'app.ui';

  const readPersistedUi = (): Partial<State['ui']> | undefined => {
    if (!isBrowser) return undefined;
    try {
      const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
      if (!g || !g.localStorage) return undefined;
      const raw = g.localStorage.getItem(storageKey);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      // keep only known keys
      return {
        themeMode: parsed?.themeMode === 'dark' ? 'dark' : 'light',
        sidebarCollapsed: !!parsed?.sidebarCollapsed,
      } as any;
    } catch {
      return undefined;
    }
  };

  const writePersistedUi = (ui: any) => {
    if (!isBrowser) return;
    try {
      const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
      if (!g || !g.localStorage) return;
      const payload = JSON.stringify({ themeMode: ui?.themeMode, sidebarCollapsed: ui?.sidebarCollapsed });
      g.localStorage.setItem(storageKey, payload);
    } catch {
      // no-op
    }
  };

  return (state: State | undefined, action: A): State => {
    // First reduce
    let nextState = reducer(state, action);

    // Attempt rehydration when state is undefined (initial run)
    if (state === undefined) {
      const persisted = readPersistedUi();
      if (persisted) {
        nextState = {
          ...(nextState as any),
          ui: {
            ...(nextState as any)?.ui,
            ...persisted,
          },
        };
      }
    }

    // Persist after reduce
    if ((nextState as any)?.ui) {
      writePersistedUi((nextState as any).ui);
    }

    return nextState;
  };
}
