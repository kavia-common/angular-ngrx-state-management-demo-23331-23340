import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * CounterControlsComponent
 * Presents buttons to control the counter and emits semantic events to the parent.
 */
@Component({
  standalone: true,
  selector: 'app-counter-controls',
  template: `
    <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
      <button class="btn-primary" type="button" (click)="decrement.emit()">-1</button>
      <button class="btn-primary" type="button" (click)="increment.emit()">+1</button>
      <button class="btn-primary" type="button" (click)="incrementAsync.emit()">+1 (async)</button>
      <button class="btn-primary" type="button" (click)="reset.emit()">Reset</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterControlsComponent {
  // PUBLIC_INTERFACE
  /** Emits when the increment action is requested. */
  @Output() increment = new EventEmitter<void>();
  // PUBLIC_INTERFACE
  /** Emits when the decrement action is requested. */
  @Output() decrement = new EventEmitter<void>();
  // PUBLIC_INTERFACE
  /** Emits when a reset is requested. */
  @Output() reset = new EventEmitter<void>();
  // PUBLIC_INTERFACE
  /** Emits when an async increment is requested. */
  @Output() incrementAsync = new EventEmitter<void>();
}
