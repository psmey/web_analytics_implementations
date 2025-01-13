import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.template';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_ATTRIBUTE = 'access_token_d';

  private readonly httpClient: HttpClient = inject(HttpClient);

  async setToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);

    return firstValueFrom(
      this.httpClient.post<{
        access_token: string;
      }>(environment.TOKEN_URL, body.toString(), { headers })
    ).then(response =>
      sessionStorage.setItem(this.TOKEN_ATTRIBUTE, response.access_token)
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_ATTRIBUTE);
  }
}
