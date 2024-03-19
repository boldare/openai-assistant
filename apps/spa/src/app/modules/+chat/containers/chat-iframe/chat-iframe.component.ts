import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { ChatService } from '../../shared/chat.service';
import { ThreadService } from '../../shared/thread.service';
import { CardComponent } from '../../../../components/cards';
import { ChatHeaderComponent } from '../../../../components/chat/chat-header/chat-header.component';
import { ChatMessagesComponent } from '../../../../components/chat/chat-messages/chat-messages.component';
import { ChatFooterComponent } from '../../../../components/chat/chat-footer/chat-footer.component';
import { ConfigurationFormComponent } from '../../../+configuration/components/configuration-form/configuration-form.component';
import { take } from 'rxjs';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';

@Component({
  selector: 'ai-chat-iframe',
  standalone: true,
  imports: [
    CardComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatFooterComponent,
    ConfigurationFormComponent,
    SpinnerComponent,
  ],
  templateUrl: './chat-iframe.component.html',
  styleUrl: './chat-iframe.component.scss',
})
export class ChatIframeComponent implements OnInit {
  messages = toSignal(this.chatService.messages$, { initialValue: [] });
  isTyping = toSignal(this.chatService.isTyping$, { initialValue: false });
  isLoading = toSignal(this.chatService.isLoading$, { initialValue: false });
  threadId = toSignal(this.threadService.threadId$, { initialValue: '' });
  isTranscriptionEnabled = environment.isTranscriptionEnabled;
  isAttachmentEnabled = environment.isAttachmentEnabled;
  isRefreshEnabled = environment.isRefreshEnabled;
  isConfigEnabled = environment.isConfigEnabled;
  tips = [
    'Hello! 👋 How can you help me?',
    'What’s the weather like in Warsaw?',
    'What is the exchange rate for USD?',
    'Show me list of Pokémon',
    'Show me the stats for Pikachu (Pokémon)?',
  ];

  constructor(
    private readonly threadService: ThreadService,
    public readonly chatService: ChatService,
  ) {}

  ngOnInit() {
    if (!this.isConfigEnabled && !this.threadService.threadId$.value) {
      this.threadService.start().pipe(take(1)).subscribe();
    }
  }
}
