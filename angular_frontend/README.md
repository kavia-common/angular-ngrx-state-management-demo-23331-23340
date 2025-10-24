# Angular + NgRx State Management Demo (Ocean Professional)

## Project overview and goals

This project is a concise, production-lean Angular application that demonstrates best practices for state management with NgRx. It showcases:
- Standalone components and application configuration (no NgModules).
- NgRx Store, Effects, Entity, and Router Store with clear feature boundaries.
- Entity-driven CRUD for a Todos feature and a simple Counter feature.
- A layout shell with top navigation, sidebar, and footer using an “Ocean Professional” visual theme (blue and amber accents).
- SSR-ready configuration with server and browser configuration separation.
- Clear patterns to add new features: actions, reducer, selectors, and effects.

The goal is to provide a clean reference for teams starting with Angular + NgRx, emphasizing maintainability, SSR safety, and readable code organization.

## Architecture summary (standalone components, provideStore/provideEffects, router-store)

The app uses Angular’s standalone APIs for configuration and bootstrapping:
- Standalone components for pages, UI elements, pipes, and layout.
- Application bootstrap is performed in src/main.ts with appConfig (src/app/app.config.ts).
- SSR bootstraps via src/main.server.ts with server-specific config (src/app/app.config.server.ts).

NgRx is provided via standalone providers:
- provideStore with reducers and metaReducers (src/app/app.config.ts).
- provideEffects registering CounterEffects and TodosEffects (src/app/app.config.ts).
- provideRouterStore integrates Router state into the NgRx store (src/app/app.config.ts).
- Store DevTools are configured for development use.

Router and routes use standalone lazy component loading with an AppShell layout:
- Routes: src/app/app.routes.ts
- Shell (layout): src/app/layout/shell/app-shell.component.ts

Key configuration file:
- src/app/app.config.ts
  - Configures router with extras (in-memory scrolling, event replay hydration on browser).
  - Registers reducers: router, counter, todos, ui.
  - Registers effects and router store.
  - Registers HttpClient with a global error interceptor.

## State slices: counter, todos (Entity), ui preferences

The root store shape is defined in src/app/store/app.state.ts:
- router: RouterReducerState
- counter: CounterState
- todos: TodosState (NgRx Entity)
- ui: UiState

1) Counter slice (src/app/features/counter/state)
- counter.actions.ts: increment, decrement, reset, incrementAsync
- counter.reducer.ts: immutable updates; initialState = { value: 0 }
- counter.selectors.ts:
  - selectCounterState
  - selectCounterValue
  - selectIsPositive

2) Todos slice using NgRx Entity (src/app/features/todos/state)
- todos.actions.ts: load/add/toggle/remove with success/failure triplets
- todos.reducer.ts:
  - Entity adapter sorted by createdAt desc
  - Flags: loaded, loading, error
  - CRUD operations via adapter helpers (setAll, addOne, upsertOne, removeOne)
  - Exported entity selectors via fromTodosEntity (selectAll, selectTotal, etc.)
- todos.selectors.ts:
  - selectTodosState (feature selector)
  - selectAllTodos, selectTodosTotal, selectTodosLoading, selectTodosLoaded
  - selectCompletedTodos, selectActiveTodos

3) UI preferences slice (src/app/store/ui)
- ui.actions.ts: toggle theme, toggle sidebar, set theme, set sidebar collapsed
- ui.reducer.ts: manages themeMode and sidebarCollapsed
- ui.selectors.ts: selectThemeMode, selectIsDarkMode, selectSidebarCollapsed

Router selectors (src/app/store/router.selectors.ts) provide route/query params from Router Store state.

## Effects and mock services (RxJS delays for demo)

Side effects live in CounterEffects and TodosEffects:
- CounterEffects.incrementAsync$: waits for delay then dispatches increment.
- TodosEffects:
  - load$: fetches all todos via TodosService.getAll
  - add$: creates a todo via TodosService.add
  - toggle$: toggles completion via TodosService.toggle
  - remove$: removes via TodosService.remove
- All effects use RxJS operators: ofType, switchMap/mergeMap, map, catchError.

Mock services simulate latency to demonstrate effect flows:
- src/app/core/services/api.service.ts: simple mock streaming endpoints.
- src/app/features/todos/services/todos.service.ts: in-memory storage with delay() and simple UUID generation. Methods return Observables to resemble real API behavior and keep SSR-safe (no direct DOM/global usage).

## Routing and layout (AppShell, TopNav, SideNav, Footer)

- AppShellComponent (src/app/layout/shell/app-shell.component.ts) defines a cohesive layout:
  - TopNav with brand, theme toggle, and quick links.
  - Responsive SideNav with router links to Dashboard, Counter, Todos, and About.
  - Main content uses <router-outlet/> to render lazily loaded standalone components.
  - Footer shows a simple copyright line.

Routes (src/app/app.routes.ts):
- ‘’ -> DashboardComponent
- ‘about’ -> AboutComponent
- ‘counter’ -> CounterPageComponent
- ‘todos’ -> TodosPageComponent (with CanDeactivate guard: unsavedChangesGuard)
- ‘**’ -> NotFoundComponent

The unsavedChangesGuard (src/app/features/todos/guards/unsaved-changes.guard.ts) demonstrates a generic SSR-safe confirm pattern using globalThis detection.

## Styling: Ocean Professional theme (CSS variables, utilities, dark mode note)

Global styles are defined in src/styles.css:
- CSS variables for Ocean Professional:
  - Colors: primary #2563EB, secondary #F59E0B, error #EF4444, surface #ffffff, background #f9fafb, text #111827.
  - Radii and shadows for modern, subtle depth.
- Utility classes: rounded, shadows, header-gradient, app-surface.
- Dark mode helpers:
  - When a container has class .dark, variables are flipped to darker values.
  - The AppShell toggles theme via a UI preference (no direct DOM API calls).
- Reusable UI components:
  - Button (src/app/shared/ui/button/button.component.ts)
  - Card (src/app/shared/ui/card/card.component.ts)

## How to run (dev, build, SSR notes) and preview info

Development server (CSR):
- From angular_frontend directory:
  - npm install
  - npm start
- The dev server listens on port 3000 as configured in angular.json.
- Open http://localhost:3000/

Build:
- npm run build
- Artifacts output to dist/angular

SSR build and serve:
- Build:
  - ng build
- Run Node SSR server:
  - npm run serve:ssr:angular
- The SSR server defaults to port 4000 (configurable via PORT env).
- Notes:
  - app.config.server.ts uses provideServerRendering only; hydration is enabled only in the browser bundle (app.config.ts) with provideClientHydration(withEventReplay()).
  - Avoid direct window/document/localStorage in providers, constructors, or guards. Use globalThis feature detection or perform browser-only logic in lifecycle hooks guarded by isPlatformBrowser.

## How to add a new feature slice (actions/reducer/selectors/effects, lazy route)

This project uses feature-first organization under src/app/features/<feature-name>. A new feature typically requires:
1) Create feature directory and assets:
   - src/app/features/widgets/
     - pages/
     - components/ (optional)
     - state/
     - services/ (optional)

2) Define actions:
   - src/app/features/widgets/state/widgets.actions.ts
   - Use createActionGroup to organize events and payloads.

3) Define reducer and state:
   - src/app/features/widgets/state/widgets.reducer.ts
   - Export initialState and the reducer function. For collections, consider NgRx Entity.

4) Define selectors:
   - src/app/features/widgets/state/widgets.selectors.ts
   - Expose a feature selector createFeatureSelector('widgets') and create memoized selectors.

5) Define effects (optional but typical for async):
   - src/app/features/widgets/state/widgets.effects.ts
   - Use createEffect to handle async flows, mapping to success/failure actions.

6) Register reducer and effects:
   - For eager features: add reducer to provideStore in app.config.ts and add the effect class to provideEffects.
   - For lazy features: you can use provideState/provideEffects in the lazy route or component providers. For this demo, reducers and effects are registered in app.config.ts (eager). For a real-world large app, prefer lazy registration.

7) Add route:
   - In src/app/app.routes.ts, add a standalone lazy component route to your feature page.

Example snippets:

Actions (widgets.actions.ts):
```ts
import { createActionGroup, props } from '@ngrx/store';

export const WidgetsActions = createActionGroup({
  source: 'Widgets',
  events: {
    load: () => ({}),
    'load success': props<{ items: string[] }>(),
    'load failure': props<{ error: unknown }>(),
  },
});
```

Reducer (widgets.reducer.ts):
```ts
import { createReducer, on } from '@ngrx/store';
import { WidgetsActions } from './widgets.actions';

export interface WidgetsState {
  items: string[];
  loading: boolean;
  error?: unknown;
}

export const initialState: WidgetsState = {
  items: [],
  loading: false,
};

export const widgetsReducer = createReducer(
  initialState,
  on(WidgetsActions.load, (s) => ({ ...s, loading: true, error: undefined })),
  on(WidgetsActions.loadSuccess, (s, { items }) => ({ ...s, items, loading: false })),
  on(WidgetsActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),
);
```

Selectors (widgets.selectors.ts):
```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetsState } from './widgets.reducer';

export const selectWidgetsState = createFeatureSelector<WidgetsState>('widgets');

export const selectWidgets = createSelector(selectWidgetsState, s => s.items);
export const selectWidgetsLoading = createSelector(selectWidgetsState, s => s.loading);
```

Effects (widgets.effects.ts):
```ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WidgetsActions } from './widgets.actions';
import { of, switchMap, map, catchError, delay } from 'rxjs';

@Injectable()
export class WidgetsEffects {
  constructor(private actions$: Actions) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.load),
      switchMap(() =>
        // Simulate API call
        of(['Alpha', 'Beta', 'Gamma']).pipe(
          delay(300),
          map(items => WidgetsActions.loadSuccess({ items })),
          catchError(error => of(WidgetsActions.loadFailure({ error })))
        )
      )
    )
  );
}
```

Registering (eager) in app.config.ts:
```ts
import { widgetsReducer } from './features/widgets/state/widgets.reducer';
import { WidgetsEffects } from './features/widgets/state/widgets.effects';

provideStore(
  {
    ...reducers,
    router: routerReducer,
    counter: counterReducer,
    todos: todosReducer,
    ui: uiReducer,
    widgets: widgetsReducer, // new
  },
  { metaReducers }
),
provideEffects([CounterEffects, TodosEffects, WidgetsEffects]),
```

Route (app.routes.ts):
```ts
{
  path: 'widgets',
  loadComponent: () =>
    import('./features/widgets/pages/widgets.page').then(m => m.WidgetsPageComponent),
  title: 'Widgets',
},
```

Lazy registration alternative:
- In the lazy page or route providers, you can use provideState({ name: 'widgets', reducer: widgetsReducer }) and provideEffects(WidgetsEffects) to avoid eager registration for large applications.

## Selector and effect usage examples

Using selectors in a component:
```ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectCounterValue, selectIsPositive } from '../features/counter/state';

@Component({
  standalone: true,
  selector: 'app-counter-summary',
  imports: [AsyncPipe, NgIf],
  template: `
    <div>
      <div>Value: {{ value$ | async }}</div>
      <small *ngIf="(isPositive$ | async) === false">Not positive</small>
    </div>
  `
})
export class CounterSummaryComponent {
  private store = inject(Store);
  value$ = this.store.select(selectCounterValue);
  isPositive$ = this.store.select(selectIsPositive);
}
```

Common effect patterns:
- switchMap for canceling in-flight requests when new events arrive:
```ts
load$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodosActions.load),
    switchMap(() =>
      this.service.getAll().pipe(
        map(todos => TodosActions.loadSuccess({ todos })),
        catchError(error => of(TodosActions.loadFailure({ error })))
      )
    )
  )
);
```

- mergeMap for concurrent operations (e.g., adding or toggling multiple items rapidly):
```ts
toggle$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodosActions.toggle),
    mergeMap(({ id }) =>
      this.service.toggle(id).pipe(
        map(todo => {
          if (!todo) throw new Error('Todo not found');
          return TodosActions.toggleSuccess({ todo });
        }),
        catchError(error => of(TodosActions.toggleFailure({ error })))
      )
    )
  )
);
```

- Timer-based UI effect (Counter async increment):
```ts
incrementAsync$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CounterActions.incrementAsync),
    switchMap(({ delayMs }) => timer(delayMs ?? 500).pipe(
      map(() => CounterActions.increment())
    ))
  )
);
```

## Contributing and folder structure

Folder structure (key paths):
- src/app/app.config.ts: Application configuration (router, store, effects, devtools, http).
- src/app/app.routes.ts: Routes with lazy standalone components and AppShell layout.
- src/app/layout/shell/app-shell.component.ts: TopNav, SideNav, main content, and footer.
- src/app/store: Root store state, meta-reducers, router selectors, and UI preferences.
- src/app/features/counter: Counter feature (components, page, state).
- src/app/features/todos: Todos feature (page, components, guards, service, entity state).
- src/app/shared: Reusable UI components and pipes.
- src/styles.css: Global theme (Ocean Professional), utilities, and dark mode helpers.
- src/app/core: Cross-cutting concerns such as Http interceptors and shared services.

Contributions:
- Keep features self-contained under src/app/features/<name>.
- Follow the patterns for actions/reducer/selectors/effects.
- Prefer pure, deterministic reducers and SSR-safe providers.
- Update this README when adding a notable architectural piece or slice.

---
Happy building with Angular + NgRx in the Ocean Professional style!
