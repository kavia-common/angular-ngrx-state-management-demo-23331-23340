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
      [class]="'btn ' + (variant === 'secondary' ? 'btn-secondary' : (variant === 'ghost' ? 'btn-ghost' : 'btn-primary'))"
    >
      <ng-content />
    </button>
  `,
  styles: [`
    /* Component-local *additions*; relies on global .btn* classes */
    :host button:focus-visible {
      outline: 2px solid color-mix(in oklab, var(--color-primary) 75%, white);
      outline-offset: 2px;
    }
  `]
})
export class AppButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
