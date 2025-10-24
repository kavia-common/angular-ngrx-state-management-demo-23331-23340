import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Todo } from '../models/todo.model';
import { TodoItemComponent } from './todo-item.component';

/**
 * PUBLIC_INTERFACE
 * TodoListComponent
 * Renders a list of TodoItem components.
 */
@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [NgFor, NgIf, TodoItemComponent],
  template: `
    <div *ngIf="todos?.length; else empty" style="display:flex; flex-direction:column; gap:.5rem;">
      <app-todo-item
        *ngFor="let t of todos"
        [todo]="t"
        (toggle)="toggle.emit($event)"
        (remove)="remove.emit($event)"
      />
    </div>
    <ng-template #empty>
      <div class="app-surface rounded-sm" style="padding:1rem;border:1px dashed #e5e7eb; text-align:center;">
        No todos yet. Add your first one!
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  // PUBLIC_INTERFACE
  @Output() toggle = new EventEmitter<string>();
  // PUBLIC_INTERFACE
  @Output() remove = new EventEmitter<string>();
}
