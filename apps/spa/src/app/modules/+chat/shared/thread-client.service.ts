import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThreadConfig, ThreadResponse } from '@boldare/ai-assistant';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ThreadClientService {
  constructor(private readonly httpClient: HttpClient) {}

  postThread(payload: ThreadConfig = {}): Observable<ThreadResponse> {
    return this.httpClient.post<ThreadResponse>(
      `${environment.apiUrl}/assistant/threads`,
      payload,
    );
  }

  getThread(id: string): Observable<ThreadResponse> {
    return this.httpClient.get<ThreadResponse>(
      `${environment.apiUrl}/assistant/threads/${id}`,
    );
  }
}
