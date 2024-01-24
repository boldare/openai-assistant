import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThreadConfig, ThreadResponse } from './chat.model';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  initialThreadId = environment.isThreadMemorized ? localStorage.getItem('threadId') || '' : '';
  threadId$ = new BehaviorSubject<string>(this.initialThreadId);

  constructor(private readonly httpClient: HttpClient) {}

  saveThreadId(id: string): void {
    localStorage.setItem('threadId', id);
    this.threadId$.next(id);
  }

  postThread(payload: ThreadConfig): Observable<ThreadResponse> {
    return this.httpClient.post<ThreadResponse>(
      `${environment.apiUrl}/chat/thread`,
      payload,
    );
  }
}
