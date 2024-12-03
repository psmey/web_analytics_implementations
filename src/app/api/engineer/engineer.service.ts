import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Engineer } from '../../models/engineer';

@Injectable({
  providedIn: 'root',
})
export class EngineerService {
  private url = `${environment.apiUrl}/engineers`;

  private readonly http: HttpClient = inject(HttpClient);

  getAll(): Observable<Engineer[]> {
    return this.http.get<Engineer[]>(this.url);
  }

  getById(id: number): Observable<Engineer> {
    return this.http.get<Engineer>(`${this.url}/${id}`);
  }

  create(data: Engineer): Observable<Engineer> {
    return this.http.post<Engineer>(this.url, data);
  }

  update(id: number, data: Engineer): Observable<Engineer> {
    return this.http.put<Engineer>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
