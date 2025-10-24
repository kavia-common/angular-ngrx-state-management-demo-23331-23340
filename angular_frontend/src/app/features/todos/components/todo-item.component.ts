import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Todo } from '../models/todo.model';

/**
 * PUBLIC_INTERFACE
 * TodoItemComponent
 * Presentational component for a single todo item.
 */
@Component({
  standalone: true,
  selector: 'app-todo-item',
  imports: [NgClass],
  template: `
    <div class="app-surface rounded-sm" style="padding:.5rem 1rem; display:flex; align-items:center; gap:.75rem; border:1px solid #e5e7eb;">
      <input type="checkbox" [checked]="todo.completed" (change)="onToggle()" />
      <span [ngClass]="{ 'line-through': todo.completed }" style="flex:1;">{{ todo.title }}</span>
      <button class="btn-primary" type="button" (click)="onRemove()">Remove</button>
    </div>
  `,
  styles: [`
    .line-through { text-decoration: line-through; opacity: .7; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  // PUBLIC_INTERFACE
  /** Emits when the user toggles completion. */
  @Output() toggle = new EventEmitter<string>();
  // PUBLIC_INTERFACE
  /** Emits when the user requests removal. */
  @Output() remove = new EventEmitter<string>();

  onToggle() {
    if (this.todo) this.toggle.emit(this.todo.id);
  }
  onRemove() {
    if (this.todo) this.remove.emit(this.todo.id);
  }
}
