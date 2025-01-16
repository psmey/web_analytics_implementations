import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let spectator: SpectatorService<AuthInterceptor>;
  const createService = createServiceFactory({
    service: AuthInterceptor,
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      JwtHelperService,
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
