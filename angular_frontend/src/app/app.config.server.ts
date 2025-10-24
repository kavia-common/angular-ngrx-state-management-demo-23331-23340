import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Server-only configuration merged with the base appConfig.
 * Notes:
 *  - Do NOT enable client hydration on the server bundle (only in browser).
 *  - Only provide server-specific providers here.
 *  - Keep providers free of any browser-only logic or tokens.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    // Enables Angular server rendering runtime.
    provideServerRendering(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
