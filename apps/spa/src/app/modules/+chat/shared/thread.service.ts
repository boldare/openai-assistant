import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThreadClientService } from './thread-client.service';
import { ThreadResponse } from './chat.model';
import { ConfigurationFormService } from '../../+configuration/shared/configuration-form.service';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  key = 'threadId';
  initialThreadId = environment.isThreadMemorized ? localStorage.getItem(this.key) || '' : '';
  threadId$ = new BehaviorSubject<string>(this.initialThreadId);
  clear$ = new Subject();

  constructor(
    private readonly threadClientService: ThreadClientService,
    private readonly configurationFormService: ConfigurationFormService,
  ) {}

  start(): Observable<ThreadResponse> {
    const messages = this.configurationFormService.getInitialThreadMessages();

    return this.threadClientService
      .postThread(environment.isConfigEnabled ? messages : {})
      .pipe(
        take(1),
        tap(({ id }) => this.saveId(id)),
      );
  }

  saveId(id: string): void {
    localStorage.setItem(this.key, id);
    this.threadId$.next(id);
  }

  clear(): void {
    this.threadId$.next('');
    this.clear$.next(true);

    localStorage.removeItem(this.key);
  }
}
