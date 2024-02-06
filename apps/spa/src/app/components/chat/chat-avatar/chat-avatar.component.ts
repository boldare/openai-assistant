import { Component } from '@angular/core';
import { ChatStatusComponent } from '../chat-status/chat-status.component';

@Component({
  selector: 'ai-chat-avatar',
  standalone: true,
  templateUrl: './chat-avatar.component.html',
  styleUrl: './chat-avatar.component.scss',
  imports: [
    ChatStatusComponent,
  ],
})
export class ChatAvatarComponent {}
