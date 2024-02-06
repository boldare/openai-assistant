import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ChatRole, Message } from './chat.model';
import { ChatGatewayService } from './chat-gateway.service';
import { ChatClientService } from './chat-client.service';
import { ThreadService } from './thread.service';
import { ChatFilesService } from './chat-files.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  isVisible$ = new BehaviorSubject<boolean>(environment.isAutoOpen);
  isLoading$ = new BehaviorSubject<boolean>(false);
  messages$ = new BehaviorSubject<Message[]>([]);

  constructor(
    private readonly chatGatewayService: ChatGatewayService,
    private readonly chatClientService: ChatClientService,
    private readonly threadService: ThreadService,
    private readonly chatFilesService: ChatFilesService,
  ) {
    document.body.classList.add('ai-chat');

    this.watchMessages();
    this.watchVisibility();
  }

  toggle(): void {
    this.isVisible$.next(!this.isVisible$.value);
  }

  refresh(): void {
    this.messages$.next([]);
    this.threadService.start().subscribe();
   }

  clear(): void {
    this.threadService.clear();
    this.messages$.next([]);
  }

  addMessage(message: Message): void {
    this.messages$.next([...this.messages$.value, message]);
  }

  async sendMessage(content: string, role = ChatRole.User): Promise<void> {
    this.isLoading$.next(true);
    this.addMessage({ content, role });

    this.chatGatewayService.sendMessage({
      content,
      threadId: this.threadService.threadId$.value,
      file_ids: await this.chatFilesService.sendFiles(),
    });
  }

  watchMessages(): Subscription {
    return this.chatGatewayService.getMessages()
      .subscribe(data => {
        this.addMessage({
          content: data.content,
          role: ChatRole.Assistant,
        });
        this.isLoading$.next(false);
      });
  }

  sendAudio(file: Blob): void {
    this.isLoading$.next(true);

    this.chatClientService
      .transcription({
        threadId: this.threadService.threadId$.value,
        file: file as File,
      })
      .pipe(take(1))
      .subscribe(response => this.sendMessage(response.content));
  }

  watchVisibility(): Subscription {
    return this.isVisible$.subscribe(isVisible => {
      if (isVisible) {
        document.body.classList.add('ai-assistant-open');
      } else {
        document.body.classList.remove('ai-assistant-open');
      }
    });
  }
}
