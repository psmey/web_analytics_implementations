import { DatePipe } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideMatomo, withRouteData, withRouter } from 'ngx-matomo-client';
import { environment } from '../environments/environment.template';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideMatomo(
      {
        siteId: environment.MATOMO.SITE_ID,
        scriptUrl: environment.MATOMO.SCRIPT_URL,
        trackerUrl: environment.MATOMO.TRACKER_URL,
      },
      withRouter(),
      withRouteData()
    ),
  ],
};
