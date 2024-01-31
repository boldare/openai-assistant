import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { ChatService } from '../../shared/chat.service';
import { ThreadService } from '../../shared/thread.service';
import { CardComponent } from '../../../../components/cards';
import { ChatHeaderComponent } from '../../../../components/chat/chat-header/chat-header.component';
import { ChatMessagesComponent } from '../../../../components/chat/chat-messages/chat-messages.component';
import { ChatFooterComponent } from '../../../../components/chat/chat-footer/chat-footer.component';

@Component({
  selector: 'ai-chat',
  standalone: true,
  imports: [
    CardComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatFooterComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages = toSignal(this.chatService.messages$, { initialValue: [] });
  isLoading = toSignal(this.chatService.isLoading$, { initialValue: false });
  threadId = toSignal(this.threadService.threadId$, { initialValue: '' });
  isTranscriptionEnabled = environment.isTranscriptionEnabled;
  isAttachmentEnabled = environment.isAttachmentEnabled;

  constructor(
    private readonly threadService: ThreadService,
    public readonly chatService: ChatService,
  ) {}
}
