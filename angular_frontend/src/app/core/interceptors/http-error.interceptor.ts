import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * httpErrorInterceptor
 * Functional interceptor that normalizes HTTP errors across the app.
 * Summary:
 *  - Pass-through for successful responses
 *  - Catches HttpErrorResponse and rethrows a normalized error object
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: unknown) => {
      const httpErr = error as HttpErrorResponse;
      const normalized = {
        status: httpErr.status ?? 0,
        message: httpErr.message ?? 'Unknown error',
        url: httpErr.url ?? undefined,
      };
      return throwError(() => normalized);
    })
  );
};
