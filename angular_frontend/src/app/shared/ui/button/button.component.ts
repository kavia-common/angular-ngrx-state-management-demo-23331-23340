import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * AppButtonComponent
 * A small reusable button component respecting the Ocean Professional theme.
 */
@Component({
  standalone: true,
  selector: 'app-button',
  template: `
    <button
      [attr.type]="type"
      [class]="'app-btn ' + variant"
    >
      <ng-content />
    </button>
  `,
  styles: [`
    .app-btn {
      border: none;
      padding: 0.6rem 1rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      transition: transform .1s ease, box-shadow .2s ease, opacity .2s ease;
      font: inherit;
    }
    .app-btn:active { transform: translateY(1px); opacity: .95; }
    .primary { background: var(--color-primary); color: white; }
    .secondary { background: var(--color-secondary); color: #111827; }
    .ghost { background: transparent; border: 1px solid #e5e7eb; }
    .ghost:hover { background: rgba(0,0,0,.04); }
  `]
})
export class AppButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
