import { AsyncPipe, NgIf, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { UiActions } from '../../store/ui/ui.actions';
import { selectIsDarkMode, selectSidebarCollapsed } from '../../store/ui/ui.selectors';
import { DebounceClickDirective } from '../../shared/directives/debounce-click.directive';

/**
 * PUBLIC_INTERFACE
 * AppShellComponent
 * The main application shell layout that includes TopNav, SideNav, and Footer.
 * It renders the active route content inside the main area via <router-outlet/>.
 */
@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgIf, NgClass, DebounceClickDirective],
  template: `
    <div class="app-shell" [class.dark]="(isDark$ | async) ?? false">
      <!-- Top Navigation -->
      <header class="topnav app-surface">
        <button type="button" class="icon-btn" appDebounceClick (debounceClick)="toggleSidebar()"
                aria-label="Toggle sidebar" title="Toggle sidebar">
          ☰
        </button>
        <div class="brand">
          <span class="logo-dot"></span>
          <span class="brand-title">Angular + NgRx Demo</span>
        </div>
        <div class="topnav-actions">
          <button type="button" class="icon-btn" appDebounceClick (debounceClick)="toggleTheme()" aria-label="Toggle theme" title="Toggle theme">
            🌗
          </button>
          <a class="topnav-link" routerLink="/about" routerLinkActive="active">About</a>
          <a class="topnav-link" href="https://ngrx.io" target="_blank" rel="noreferrer">NgRx</a>
        </div>
      </header>

      <div class="app-body">
        <!-- Side Navigation -->
        <aside class="sidenav app-surface"
               [class.collapsed]="(sidebarCollapsed$ | async) ?? false">
          <nav class="nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
              <span class="icon">🏠</span><span class="label">Dashboard</span>
            </a>
            <a routerLink="/counter" routerLinkActive="active">
              <span class="icon">🔢</span><span class="label">Counter</span>
            </a>
            <a routerLink="/todos" routerLinkActive="active">
              <span class="icon">📝</span><span class="label">Todos</span>
            </a>
            <a routerLink="/about" routerLinkActive="active">
              <span class="icon">ℹ️</span><span class="label">About</span>
            </a>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="content">
          <router-outlet />
        </main>
      </div>

      <!-- Footer -->
      <footer class="footer app-surface">
        <small>© {{ year }} Ocean Professional · Angular + NgRx</small>
      </footer>
    </div>
  `,
  styles: [`
    :host, .app-shell { display: block; min-height: 100vh; }
    .app-shell.dark { --color-background: #0b1220; --color-surface: #0f172a; --color-text: #e5e7eb; }
    .topnav {
      position: sticky; top: 0; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      padding: .5rem .75rem; border-bottom: 1px solid #e5e7eb;
      background-image: linear-gradient(135deg, rgba(37,99,235,0.10), #f3f4f6);
      backdrop-filter: blur(6px);
    }
    .brand { display:flex; align-items:center; gap:.5rem; font-weight: 600; color: var(--color-primary); }
    .logo-dot { width: .75rem; height: .75rem; background: var(--color-primary); border-radius: 50%; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
    .brand-title { letter-spacing: .2px; }
    .topnav-actions { display:flex; align-items:center; gap:.25rem; }
    .topnav-link { padding: .4rem .6rem; border-radius: var(--radius-sm); color: inherit; text-decoration: none; opacity:.9; }
    .topnav-link:hover { background: rgba(0,0,0,.04); }
    .topnav-link.active { background: rgba(37,99,235,.12); color: var(--color-primary); }

    .icon-btn {
      background: transparent; border: 1px solid #e5e7eb;
      padding: .35rem .55rem; border-radius: var(--radius-sm);
      cursor: pointer; transition: background .2s ease, transform .1s ease;
    }
    .icon-btn:hover { background: rgba(0,0,0,.04); }
    .icon-btn:active { transform: translateY(1px); }

    .app-body { display: grid; grid-template-columns: 240px 1fr; gap: 1rem; padding: 1rem; }
    .sidenav {
      height: calc(100dvh - 72px);
      position: sticky; top: 72px;
      padding: .75rem; border: 1px solid #e5e7eb; border-radius: var(--radius-lg);
      transition: width .2s ease, transform .2s ease;
      width: 240px; overflow: hidden;
    }
    .sidenav.collapsed { width: 64px; }
    .nav-links { display:flex; flex-direction: column; gap:.25rem; }
    .nav-links a {
      display:flex; align-items:center; gap:.5rem;
      padding: .55rem .6rem; border-radius: var(--radius-md);
      color: inherit; text-decoration: none; opacity:.9; border: 1px solid transparent;
    }
    .nav-links a:hover { background: rgba(0,0,0,.04); }
    .nav-links a.active { background: rgba(37,99,235,.12); color: var(--color-primary); border-color: rgba(37,99,235,.25); }
    .nav-links .icon { width: 1.25rem; text-align:center; }
    .sidenav.collapsed .label { display: none; }

    .content { min-height: 60vh; }
    .footer {
      margin: 1rem; padding: .75rem 1rem; text-align: center;
      border: 1px solid #e5e7eb; border-radius: var(--radius-lg);
    }

    @media (max-width: 900px) {
      .app-body { grid-template-columns: 1fr; }
      .sidenav { position: relative; top: 0; height: auto; width: 100%; }
      .sidenav.collapsed { transform: translateX(-105%); position: absolute; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  private store = inject(Store);
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  // Streams only; no direct DOM access here to keep SSR-safe.
  isDark$ = this.store.select(selectIsDarkMode);
  sidebarCollapsed$ = this.store.select(selectSidebarCollapsed);

  // PUBLIC_INTERFACE
  /** Toggle theme between light and dark mode (SSR-safe). */
  toggleTheme() {
    this.store.dispatch(UiActions.toggleTheme({}));
  }

  // PUBLIC_INTERFACE
  /** Toggle the sidebar collapsed/expanded state (SSR-safe). */
  toggleSidebar() {
    this.store.dispatch(UiActions.toggleSidebar({}));
  }
}
