import { Component, Input } from '@angular/core';
import { Message } from '../../../modules/+chat/shared/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import { ChatAudioComponent } from '../chat-audio/chat-audio.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ai-chat-message',
  standalone: true,
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  imports: [
    MarkdownComponent,
    ChatAudioComponent,
    NgClass,
  ],
})
export class ChatMessageComponent {
  @Input() message!: Message;
}
