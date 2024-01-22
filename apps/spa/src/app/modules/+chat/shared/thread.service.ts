import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThreadConfig, ThreadResponse } from './chat.model';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  threadId$ = new BehaviorSubject<string>(
    localStorage.getItem('threadId') || '',
  );

  constructor(private readonly httpClient: HttpClient) {}

  saveThreadId(id: string): void {
    this.threadId$.next(id);
  }

  postThread(payload: ThreadConfig): Observable<ThreadResponse> {
    return this.httpClient.post<ThreadResponse>(
      `${environment.apiUrl}/chat/thread`,
      payload,
    );
  }
}
