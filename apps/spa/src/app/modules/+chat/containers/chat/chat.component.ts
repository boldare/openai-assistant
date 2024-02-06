import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { ChatService } from '../../shared/chat.service';
import { ThreadService } from '../../shared/thread.service';
import { CardComponent } from '../../../../components/cards';
import { ChatHeaderComponent } from '../../../../components/chat/chat-header/chat-header.component';
import { ChatMessagesComponent } from '../../../../components/chat/chat-messages/chat-messages.component';
import { ChatFooterComponent } from '../../../../components/chat/chat-footer/chat-footer.component';
import {
  ConfigurationFormComponent
} from '../../../+configuration/components/configuration-form/configuration-form.component';
import { take } from 'rxjs';

@Component({
  selector: 'ai-chat',
  standalone: true,
  imports: [
    CardComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatFooterComponent,
    ConfigurationFormComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  messages = toSignal(this.chatService.messages$, { initialValue: [] });
  isLoading = toSignal(this.chatService.isLoading$, { initialValue: false });
  threadId = toSignal(this.threadService.threadId$, { initialValue: '' });
  isTranscriptionEnabled = environment.isTranscriptionEnabled;
  isAttachmentEnabled = environment.isAttachmentEnabled;
  isRefreshEnabled = environment.isRefreshEnabled;
  isConfigEnabled = environment.isConfigEnabled;
  tips = [
    'Hello there! 👋',
    'Could you please tell me your name?',
    'Hello! How can you help me?',
    'Hello! 👋 How are you?',
  ];

  constructor(
    private readonly threadService: ThreadService,
    public readonly chatService: ChatService,
  ) {}

  ngOnInit() {
    if (!this.isConfigEnabled) {
      this.threadService
        .start()
        .pipe(take(1))
        .subscribe();
    }
  }
}
