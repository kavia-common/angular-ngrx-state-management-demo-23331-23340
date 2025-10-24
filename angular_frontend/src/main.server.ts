import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Server bootstrap for SSR. Must return a Promise<ApplicationRef>.
 * Keep free of any browser-only code.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
