/**
 * PUBLIC_INTERFACE
 * TodosService
 * Mock in-memory service for Todos with RxJS delays to simulate API latency.
 */
import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private items: Todo[] = [
    { id: '1', title: 'Learn NgRx Entity', completed: false, createdAt: Date.now() - 100000 },
    { id: '2', title: 'Build Todos feature', completed: true, createdAt: Date.now() - 50000 },
  ];

  private networkDelay = 300;

  // PUBLIC_INTERFACE
  /** Returns all todos. */
  getAll(): Observable<Todo[]> {
    return of(this.items).pipe(delay(this.networkDelay));
  }

  // PUBLIC_INTERFACE
  /** Adds a todo and returns the created record. */
  add(title: string): Observable<Todo> {
    // Simple UUID generator (avoids relying on global crypto in all environments)
    const uuid = () =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

    const todo: Todo = {
      id: uuid(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    this.items = [todo, ...this.items];
    return of(todo).pipe(delay(this.networkDelay));
  }

  // PUBLIC_INTERFACE
  /** Toggles completed for the given id and returns the updated record. */
  toggle(id: string): Observable<Todo | undefined> {
    this.items = this.items.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
    return of(this.items.find(t => t.id === id)).pipe(delay(this.networkDelay));
  }

  // PUBLIC_INTERFACE
  /** Removes a todo by id and returns the removed id. */
  remove(id: string): Observable<string> {
    this.items = this.items.filter(t => t.id !== id);
    return of(id).pipe(delay(this.networkDelay));
  }
}
