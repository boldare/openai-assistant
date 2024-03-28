import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  take,
  tap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ThreadClientService } from './thread-client.service';
import { ConfigurationFormService } from '../../+configuration/shared/configuration-form.service';
import { GetThreadResponseDto } from '@boldare/openai-assistant';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  key = 'threadId';
  initialThreadId = environment.isThreadMemorized
    ? localStorage.getItem(this.key) || ''
    : '';
  threadId$ = new BehaviorSubject<string>(this.initialThreadId);
  clear$ = new Subject();

  constructor(
    private readonly threadClientService: ThreadClientService,
    private readonly configurationFormService: ConfigurationFormService,
  ) {}

  start(): Observable<GetThreadResponseDto> {
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

  getThread(id: string): Observable<GetThreadResponseDto> {
    return this.threadClientService.getThread(id).pipe(
      take(1),
      catchError(() => this.start()),
    );
  }
}
