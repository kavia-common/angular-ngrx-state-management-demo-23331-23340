import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * DebounceClickDirective
 * Emits 'debounceClick' output after a quiet period when user clicks repeatedly.
 * Useful to avoid double submissions or excessive dispatches.
 *
 * Usage:
 *  <button appDebounceClick [debounceTime]="300" (debounceClick)="handler()">Submit</button>
 */
@Directive({
  selector: '[appDebounceClick]',
  standalone: true,
})
export class DebounceClickDirective {
  @Input() debounceTime = 250; // ms
  @Output() debounceClick = new EventEmitter<unknown>();

  private timeoutId: number | undefined;

  // Narrow event type to unknown to avoid linting globals; downstream handlers can type as needed.
  @HostListener('click', ['$event'])
  onClick(event: unknown) {
    // Prevent bubbling when available (browser)
    const e = event as { preventDefault?: () => void; stopPropagation?: () => void };
    try { e?.preventDefault?.(); } catch {}
    try { e?.stopPropagation?.(); } catch {}

    // Use globalThis for SSR-safe feature detection
    const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;

    if (this.timeoutId && g?.clearTimeout) {
      g.clearTimeout(this.timeoutId);
    }

    if (g?.setTimeout) {
      this.timeoutId = g.setTimeout(() => {
        this.debounceClick.emit(event);
        this.timeoutId = undefined;
      }, this.debounceTime);
    } else {
      // Fallback: emit immediately when timers not available (SSR)
      this.debounceClick.emit(event);
    }
  }
}
