import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoFormComponent } from '../components/todo-form.component';
import { TodoListComponent } from '../components/todo-list.component';
import { TodosActions } from '../state';
import { selectAllTodos, selectTodosLoading, selectTodosTotal } from '../state';

/**
 * PUBLIC_INTERFACE
 * TodosPageComponent
 * Feature page orchestrating list/form and dispatching NgRx actions.
 */
@Component({
  standalone: true,
  selector: 'app-todos-page',
  imports: [AsyncPipe, NgIf, TodoFormComponent, TodoListComponent],
  template: `
    <section class="app-surface rounded-lg shadow-sm" style="padding:1.25rem;margin:1rem;">
      <header class="header-gradient rounded" style="padding:1rem;margin-bottom:1rem;">
        <h2 style="color:var(--color-primary); margin-bottom:.25rem;">Todos</h2>
        <p class="text-muted">Entity-based state management with NgRx.</p>
      </header>

      <app-todo-form (add)="onAdd($event)" />

      <div style="display:flex; align-items:center; justify-content:space-between; margin:.75rem 0;">
        <small>Items: {{ total$ | async }}</small>
        <small *ngIf="(loading$ | async)">Loading...</small>
      </div>

      <app-todo-list
        [todos]="(todos$ | async) || []"
        (toggle)="onToggle($event)"
        (remove)="onRemove($event)"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosPageComponent implements OnInit {
  private store = inject(Store);

  todos$: Observable<Todo[]> = this.store.select(selectAllTodos);
  loading$: Observable<boolean> = this.store.select(selectTodosLoading);
  total$: Observable<number> = this.store.select(selectTodosTotal);

  ngOnInit(): void {
    this.store.dispatch(TodosActions.load());
  }

  // PUBLIC_INTERFACE
  /** Dispatch to add a new todo. */
  onAdd(title: string) {
    this.store.dispatch(TodosActions.add({ title }));
  }

  // PUBLIC_INTERFACE
  /** Dispatch to toggle todo completed state. */
  onToggle(id: string) {
    this.store.dispatch(TodosActions.toggle({ id }));
  }

  // PUBLIC_INTERFACE
  /** Dispatch to remove a todo. */
  onRemove(id: string) {
    this.store.dispatch(TodosActions.remove({ id }));
  }
}
