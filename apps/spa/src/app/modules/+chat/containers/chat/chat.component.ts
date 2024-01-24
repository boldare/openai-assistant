import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChatRole, MessageHistory } from '../../shared/chat.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ThreadService } from '../../shared/thread.service';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { MessageTypingComponent } from '../../components/message-typing/message-typing.component';
import { ChatFormComponent } from '../../components/chat-form/chat-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { ChatHeaderComponent } from '../../components/chat-header/chat-header.component';
import { ChatRecorderComponent } from '../../components/chat-recorder/chat-recorder.component';
import { environment } from '../../../../../environments/environment';
import { MessageAudioComponent } from '../../components/message-audio/message-audio.component';

@Component({
  selector: 'ai-chat',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    NgClass,
    MarkdownModule,
    MessageTypingComponent,
    ChatFormComponent,
    ChatHeaderComponent,
    ChatRecorderComponent,
    MessageAudioComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChildren('item') item?: QueryList<MarkdownComponent>;
  messages: MessageHistory[] = [];
  content: string = '';
  isLoading = false;
  threadId = toSignal(this.threadService.threadId$, { initialValue: '' });
  subscription: Subscription = new Subscription();
  isAudioEnabled = environment.isAudioEnabled;

  constructor(
    private readonly chatService: ChatService,
    private readonly threadService: ThreadService,
  ) {}

  ngAfterViewInit() {
    this.scrollDown();
  }

  ngOnInit(): void {
    this.subscription.add(this.watchMessages());
  }

  scrollDown(): void {
    setTimeout(() => {
      const lastChildElement = this.item?.last?.element.nativeElement;
      lastChildElement?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  watchMessages(): Subscription {
    return this.chatService.getMessages().subscribe(data => {
      this.isLoading = false;
      this.messages.push({
        content: data.content,
        role: ChatRole.Assistant,
      });
      this.scrollDown();
    });
  }

  clearChat(): void {
    this.messages = [];
    this.threadService.saveThreadId('');
  }

  sendAudio(file: Blob) {
    this.isLoading = true;
    this.chatService
      .transcription({
        threadId: this.threadId(),
        file: file as File,
      })
      .subscribe(response => {
        this.sendMessage(response.content);
      });
  }

  sendMessage(content: string) {
    this.isLoading = true;
    this.messages.push({ role: ChatRole.User, content });
    this.chatService.sendMessage({
      content,
      threadId: this.threadId(),
    });
    this.content = '';
    this.scrollDown();
  }
}
