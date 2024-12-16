import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let mockHttpRequest: HttpRequest<unknown>;
  const executeInterceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockHttpRequest = new HttpRequest<unknown>('GET', 'some/api/request');
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(executeInterceptor).toBeTruthy();
  });

  it('should add Authorization header if token is available in sessionStorage', () => {
    sessionStorage.setItem('token', 'mock-token');

    const mockHttpHandlerFn: HttpHandlerFn = req => {
      expect(req.headers.has('Authorization')).toBeTruthy();
      expect(req.headers.get('Authorization')).toBe('Bearer mock-token');
      return of(new HttpResponse({ status: 200 }));
    };

    executeInterceptor(mockHttpRequest, mockHttpHandlerFn);
  });

  it('should not add Authorization header if token is not available in sessionStorage', () => {
    const mockHttpHandlerFn: HttpHandlerFn = req => {
      expect(req.headers.has('Authorization')).toBeFalsy();
      expect(req.headers.get('Authorization')).toBeNull();
      return of(new HttpResponse({ status: 200 }));
    };

    executeInterceptor(mockHttpRequest, mockHttpHandlerFn);
  });
});
