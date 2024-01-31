import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ChatRole, Message } from './chat.model';
import { ChatGatewayService } from './chat-gateway.service';
import { ChatClientService } from './chat-client.service';
import { ThreadService } from './thread.service';
import { ChatFilesService } from './chat-files.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  messages$ = new BehaviorSubject<Message[]>([
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
    {
      content: 'Hello',
      role: ChatRole.User,
    },
    {
      content: 'Hi! I\'m your assistant. How can I help you?',
      role: ChatRole.Assistant,
    },
  ]);

  constructor(
    private readonly chatGatewayService: ChatGatewayService,
    private readonly chatClientService: ChatClientService,
    private readonly threadService: ThreadService,
    private readonly chatFilesService: ChatFilesService,
  ) {
    this.watchMessages();
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
}
