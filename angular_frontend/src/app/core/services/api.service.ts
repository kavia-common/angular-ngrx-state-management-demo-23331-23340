import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, of } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * ApiService
 * This service abstracts API calls. Currently returns mock data streams for demo purposes.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  /** Returns a mock list of items with a small delay to simulate network latency. */
  getItems() {
    return of([
      { id: 1, name: 'First Item' },
      { id: 2, name: 'Second Item' },
    ]).pipe(delay(300));
  }

  // PUBLIC_INTERFACE
  /** Returns a single item by id as a mock call. */
  getItemById(id: number) {
    return of({ id, name: `Item #${id}` }).pipe(delay(200));
  }
}
