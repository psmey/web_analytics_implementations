import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.template';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  async setToken(): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);

    firstValueFrom(
      this.httpClient.post<{
        access_token: string;
      }>(environment.TOKEN_URL, body.toString(), { headers })
    ).then(response =>
      sessionStorage.setItem('access_token', response.access_token)
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}
