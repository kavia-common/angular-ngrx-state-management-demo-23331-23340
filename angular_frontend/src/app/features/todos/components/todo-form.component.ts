import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * TodoFormComponent
 * Simple input + button to create new todos.
 */
@Component({
  standalone: true,
  selector: 'app-todo-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" style="display:flex; gap:.5rem; flex-wrap:wrap;">
      <input
        class="input"
        name="title"
        [(ngModel)]="title"
        (ngModelChange)="dirty = true"
        placeholder="What needs to be done?"
        style="flex:1; min-width: 220px;"
        aria-label="Todo title"
      />
      <button class="btn-primary" type="submit">Add</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {
  title = '';
  dirty = false;

  // PUBLIC_INTERFACE
  /** Emits new todo title when submitted and non-empty. */
  @Output() add = new EventEmitter<string>();

  submit() {
    const trimmed = this.title.trim();
    if (trimmed.length) {
      this.add.emit(trimmed);
      this.title = '';
      this.dirty = false;
    }
  }

  // PUBLIC_INTERFACE
  /** Returns true when there is text typed that hasn't been submitted. */
  hasUnsavedChanges(): boolean {
    return this.dirty && this.title.trim().length > 0;
  }
}
