import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  mergeMap,
  Subscription,
  take,
} from 'rxjs';
import { ChatRole, Message, MessageStatus } from './chat.model';
import { ChatGatewayService } from './chat-gateway.service';
import { ChatClientService } from './chat-client.service';
import { ThreadService } from './thread.service';
import { ChatFilesService } from './chat-files.service';
import { environment } from '../../../../environments/environment';
import { OpenAiFile, ThreadResponse } from '@boldare/ai-assistant';
import { Threads } from 'openai/resources/beta';
import MessageContentText = Threads.MessageContentText;
import { ThreadMessage } from 'openai/resources/beta/threads';

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

    this.setInitialValues();
    this.watchMessages();
    this.watchVisibility();
  }

  isMessageInvisible(message: ThreadMessage): boolean {
    const metadata = message.metadata as Record<string, unknown>;
    return metadata?.['status'] === MessageStatus.Invisible;
  }

  isTextMessage(message: ThreadMessage): boolean {
    return message.content[0].type === 'text';
  }

  parseMessages(thread: ThreadResponse): Message[] {
    return thread.messages
      .reverse()
      .filter(
        message =>
          this.isTextMessage(message) && !this.isMessageInvisible(message),
      )
      .map(message => ({
        content: (message.content[0] as MessageContentText).text.value,
        role: message.role as ChatRole,
      }));
  }

  setInitialValues(): void {
    this.threadService.threadId$
      .pipe(
        distinctUntilChanged(),
        mergeMap(threadId => this.threadService.getThread(threadId)),
        map((response: ThreadResponse) => this.parseMessages(response)),
      )
      .subscribe(data => this.messages$.next(data));
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

  addFileMessage(files: OpenAiFile[]): void {
    if (!files?.length) {
      return;
    }

    this.addMessage({
      content: `The user has attached files to the message: ${files
        .map(file => file.filename)
        .join(', ')}`,
      role: ChatRole.System,
    });
  }

  async sendMessage(content: string, role = ChatRole.User): Promise<void> {
    this.isLoading$.next(true);
    this.addMessage({ content, role });

    const files = await this.chatFilesService.sendFiles();
    this.addFileMessage(files);

    this.chatGatewayService.sendMessage({
      content,
      threadId: this.threadService.threadId$.value,
      file_ids: files.map(file => file.id) || [],
    });
  }

  watchMessages(): Subscription {
    return this.chatGatewayService.getMessages().subscribe(data => {
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

  loadScript(): void {
    const body: HTMLDivElement = document.body as HTMLDivElement;
    const script = document.createElement('script') as HTMLScriptElement;

    script.innerHTML = '';
    script.src = '/assets/js/ai-embedded.js';
    script.async = true;
    script.defer = true;
    script.dataset['chatInitial'] = 'true';
    body.appendChild(script);
  }
}
