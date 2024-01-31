import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThreadConfig, ThreadResponse } from './chat.model';

@Injectable({ providedIn: 'root' })
export class ThreadClientService {
  constructor(private readonly httpClient: HttpClient) {}

  postThread(payload: ThreadConfig): Observable<ThreadResponse> {
    return this.httpClient.post<ThreadResponse>(
      `${environment.apiUrl}/assistant/threads`,
      payload,
    );
  }
}
