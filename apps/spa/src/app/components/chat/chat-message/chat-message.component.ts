import { Component, HostBinding, Input } from '@angular/core';
import { ChatRole, Message } from '../../../modules/+chat/shared/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import { ChatAudioComponent } from '../chat-audio/chat-audio.component';
import { NgClass } from '@angular/common';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';

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
  @Input() message!: Message;
  @Input() class = '';
  chatRole = ChatRole;

  @HostBinding('class') get getClasses(): string {
    return `${this.class} is-${this.message?.role || 'none'}`;
  }
}
