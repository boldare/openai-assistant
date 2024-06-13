import { Component, HostBinding, Input } from '@angular/core';
import {
  ChatRole,
  ChatMessage,
} from '../../../modules/+chat/shared/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import { ChatAudioComponent } from '../chat-audio/chat-audio.component';
import { NgClass } from '@angular/common';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';
import { MessageImageFilePipe } from '../../../pipes/message-file.pipe';
import { AnnotationPipe } from '../../../pipes/annotation.pipe';
import { ChatAnnotationsComponent } from '../chat-annotations/chat-annotations.component';

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
    MessageImageFilePipe,
    AnnotationPipe,
    ChatAnnotationsComponent,
  ],
})
export class ChatMessageComponent {
  @Input() message!: Partial<ChatMessage>;
  @Input() class = '';
  chatRole = ChatRole;

  @HostBinding('class') get getClasses(): string {
    return `${this.class} is-${this.message?.role || 'none'}`;
  }
}
