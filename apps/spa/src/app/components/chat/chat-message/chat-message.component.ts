import { Component, HostBinding, Input } from '@angular/core';
import {
  ChatRole,
  ChatMessage,
} from '../../../modules/+chat/shared/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import { ChatAudioComponent } from '../chat-audio/chat-audio.component';
import { NgClass } from '@angular/common';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';
import {
  getMessageImage,
  getMessageText,
} from '../../controls/message-content/message-content.helpers';
import { ImageFileContentBlock } from 'openai/resources/beta/threads';

@Component({
  selector: 'ai-chat-message',
  standalone: true,
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  imports: [
    NgClass,
    MarkdownComponent,
    ChatAudioComponent,
    ChatAvatarComponent,
  ],
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
  @Input() class = '';
  chatRole = ChatRole;

  get messageText(): string {
    return getMessageText(this.message);
  }

  get messageImage(): ImageFileContentBlock[] {
    return getMessageImage(this.message);
  }

  @HostBinding('class') get getClasses(): string {
    return `${this.class} is-${this.message?.role || 'none'}`;
  }
}
