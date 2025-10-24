import { Pipe, PipeTransform } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * HighlightPipe
 * Wraps matching text with <mark> for simple keyword highlighting.
 */
@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string | null | undefined, term: string | null | undefined): string {
    if (!text || !term) return text ?? '';
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(escaped, 'gi'), (match) => `<mark>${match}</mark>`);
  }
}
