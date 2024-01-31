import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  key = 'threadId';
  initialThreadId = environment.isThreadMemorized ? localStorage.getItem(this.key) || '' : '';
  threadId$ = new BehaviorSubject<string>(this.initialThreadId);
  clear$ = new Subject();

  constructor(private readonly router: Router) {
    this.threadId$.subscribe((id) => this.router.navigate([id ? '/chat' : '/']));
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
