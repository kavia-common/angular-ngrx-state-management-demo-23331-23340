import { CanDeactivateFn } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * UnsavedChangesGuard
 * CanDeactivate guard that prompts on navigation away when a form is "dirty".
 * This is a simple generic guard: it checks for a canDeactivate() method on the component,
 * else falls back to a no-op (allow navigation).
 *
 * To use, implement on the component:
 *  - hasUnsavedChanges(): boolean   // returns true when the component has pending edits
 *  - getConfirmMessage?(): string   // optional custom message
 *
 * SSR safety:
 *  - Uses globalThis feature detection to avoid direct window/document usage.
 */
export const unsavedChangesGuard: CanDeactivateFn<unknown> = (component) => {
  const hasUnsaved =
    typeof (component as any)?.hasUnsavedChanges === 'function'
      ? (component as any).hasUnsavedChanges()
      : false;

  if (!hasUnsaved) {
    return true;
  }

  const message =
    typeof (component as any)?.getConfirmMessage === 'function'
      ? (component as any).getConfirmMessage()
      : 'You have unsaved changes. Are you sure you want to leave this page?';

  // SSR-safe confirm: only prompt when running in a browser environment.
  const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
  const hasWindowConfirm = !!g && typeof g.confirm === 'function';
  if (hasWindowConfirm) {
    return g.confirm(message);
  }
  // On the server: allow navigation (no blocking prompt possible)
  return true;
};
