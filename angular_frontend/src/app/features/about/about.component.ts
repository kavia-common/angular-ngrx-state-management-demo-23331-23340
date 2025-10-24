import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-about',
  template: `
    <section class="app-surface rounded-lg shadow-sm" style="padding:1.25rem;margin:1rem;">
      <h2 style="color:var(--color-primary);margin-bottom:.5rem;">About</h2>
      <p>This is a placeholder About view. Content will be added later.</p>
    </section>
  `,
})
export class AboutComponent {}
