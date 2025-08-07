import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi() // <-- this enables interceptor
    ),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-pu-4qw93.us.auth0.com',
        clientId: 'AVupjakLeQMMLb66JRFwKswkJxhrMtVF',
        authorizationParams: {
          redirect_uri: `${window.location.origin}/input`,
          audience: 'https://short-story.ai',
          scope: "openid profile email"
        },
        httpInterceptor: {
          allowedList: [
            {
              uri: 'https://localhost:7048/api/*', // Adjust to your API endpoint
              tokenOptions: {
                authorizationParams: {
                  audience: 'https://short-story.ai',
                  scope: "openid profile email"
                }
              }
            },
            {
              uri: 'http://localhost:3333/api/*', // Adjust to your API endpoint
              tokenOptions: {
                authorizationParams: {
                  audience: 'https://short-story.ai',
                  scope: "openid profile email"
                }
              }
            },
            {
              uri: 'https://storyshortaiclone.onrender.com/api/*', // Adjust to your API endpoint
              tokenOptions: {
                authorizationParams: {
                  audience: 'https://short-story.ai',
                  scope: "openid profile email"
                }
              }
            },
            {
              uri: 'https://storyshortaiclone-2-381336012870.europe-west1.run.app/api*', // Adjust to your API endpoint
              tokenOptions: {
                authorizationParams: {
                  audience: 'https://short-story.ai',
                  scope: "openid profile email"
                }
              }
            }
          ]
        }
      })
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ]
};
