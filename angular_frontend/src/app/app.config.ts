import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

/* NgRx core */
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

/* App Store */
import { reducers, metaReducers } from './store/app.reducers';
import { uiReducer } from './store/ui/ui.reducer';

/* HTTP and Interceptors */
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

/* Feature: Counter */
import { counterReducer } from './features/counter/state/counter.reducer';
import { CounterEffects } from './features/counter/state/counter.effects';

/* Feature: Todos */
import { todosReducer } from './features/todos/state/todos.reducer';
import { TodosEffects } from './features/todos/state/todos.effects';

/**
 * Note on SSR safety:
 * - provideClientHydration is only applied in the browser bundle (this file);
 *   server bundle uses app.config.server.ts without hydration.
 * - No direct window/document/localStorage usage in providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Router with extras and SSR-safe settings
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        paramsInheritanceStrategy: 'always'
      })
    ),
    provideClientHydration(withEventReplay()),

    // HttpClient + global error interceptor
    provideHttpClient(withInterceptors([httpErrorInterceptor])),

    // NgRx Store setup
    provideStore(
      {
        ...reducers,
        router: routerReducer,
        counter: counterReducer,
        todos: todosReducer,
        ui: uiReducer,
      },
      { metaReducers }
    ),
    provideEffects([CounterEffects, TodosEffects]),
    // Router store; enable standard tracing via console in dev with a minimal hook
    provideRouterStore(),

    // Devtools only in dev
    provideStoreDevtools({
      maxAge: 25,
      name: 'Angular NgRx Demo',
      logOnly: false
    }),
  ]
};
