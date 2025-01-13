import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.template';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.includes(environment.API_URL)) {
      return from(this.handle(req, next));
    }

    return next.handle(req);
  }

  private async handle(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Promise<HttpEvent<unknown>> {
    let token = this.authService.getToken();

    if (!token) {
      await this.authService.setToken();
      token = this.authService.getToken();
    }

    const authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });

    return lastValueFrom(next.handle(authReq));
  }
}
