# Angular + NgRx State Management Demo (Ocean Professional)

A modern Angular 19 standalone app demonstrating NgRx best practices with an Ocean Professional theme (primary #2563EB, secondary #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827). The layout includes a top navbar, sidebar, main content, and footer. Features include a Counter and Todos (Entity) slice with actions, reducers, selectors, and effects.

## Quick start

- Dev server (CSR)
  - cd angular_frontend
  - npm install
  - npm start
  - Open http://localhost:3000

- Build
  - npm run build
  - Output at dist/angular

- SSR (optional)
  - ng build
  - npm run serve:ssr:angular
  - Open http://localhost:4000

Angular packages are pinned to Angular 19 and NgRx 19 to avoid version conflicts.

## Routes and layout

- Shell: src/app/layout/shell/app-shell.component.ts
  - Top navbar with brand, theme toggle, and quick links
  - Sidebar with links: Dashboard (/), Counter (/counter), Todos (/todos), About (/about)
  - Main content via <router-outlet/>
  - Footer with copyright
- Routes: src/app/app.routes.ts
  - "": Dashboard
  - "counter": CounterPage
  - "todos": TodosPage (CanDeactivate unsavedChangesGuard)
  - "about": About
  - "**": NotFound

## NgRx state overview

- Root store: src/app/store/app.state.ts
  - router: RouterReducerState
  - counter: CounterState
  - todos: TodosState (Entity)
  - ui: UiState

- Counter feature: src/app/features/counter/state
  - Actions: increment, decrement, reset, incrementAsync
  - Reducer: counterReducer with initialState { value: 0 }
  - Selectors: selectCounterState, selectCounterValue, selectIsPositive
  - Effects: incrementAsync$ uses timer() then dispatches increment

- Todos feature (Entity): src/app/features/todos/state
  - Actions: load/add/toggle/remove with success/failure variants
  - Reducer: EntityAdapter sorted by createdAt desc, flags loaded/loading/error
  - Selectors: selectAllTodos, selectTodosTotal, selectTodosLoading, selectTodosLoaded, selectCompletedTodos, selectActiveTodos
  - Effects: load$, add$, toggle$, remove$ using TodosService (mock async)

- UI preferences: src/app/store/ui
  - Actions: toggle theme, toggle sidebar, set theme, set sidebar collapsed
  - Reducer: themeMode ('light'|'dark'), sidebarCollapsed (boolean)
  - Selectors: selectThemeMode, selectIsDarkMode, selectSidebarCollapsed
  - Meta-reducer: localStorageUiMetaReducer (SSR-safe persistence of UI slice)
  - Debug meta-reducer for dev logging

- Router store selectors: src/app/store/router.selectors.ts

- Store registration: src/app/app.config.ts
  - provideStore with reducers: router, counter, todos, ui
  - provideEffects: CounterEffects, TodosEffects
  - provideRouterStore and Store DevTools (dev)
  - HttpClient with httpErrorInterceptor

## Styling: Ocean Professional

Global theme variables and utilities live in src/styles.css:
- Colors: primary #2563EB, secondary #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827
- Utilities: rounded radii, subtle shadows, header-gradient, app-surface
- Dark mode toggled via UI slice—no direct DOM access; .dark class applied at Shell level

Reusable UI:
- Button: src/app/shared/ui/button/button.component.ts
- Card: src/app/shared/ui/card/card.component.ts
- Debounce click directive and a highlight pipe

## Adding a new feature slice

1) Create directories under src/app/features/<name> (pages, components, state, services)
2) Actions: createActionGroup
3) Reducer: createReducer with initial state
4) Selectors: feature selector + memoized selectors
5) Effects: createEffect with ofType, switchMap/mergeMap, map, catchError
6) Register in app.config.ts (eager) or use provideState/provideEffects in the lazy route
7) Add route in app.routes.ts

See the README sections and existing Counter/Todos implementations for reference.

## Notes

- SSR safety: avoid direct window/document/localStorage in providers; use globalThis checks or isPlatformBrowser
- Router configured with in-memory scrolling and event replay hydration (browser only)
- DevTools enabled in development

Happy building!
