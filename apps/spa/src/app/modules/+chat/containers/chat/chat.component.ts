import { Component } from '@angular/core';
import { AssistantIframe } from '@boldare/ai-embedded';
import { ChatService } from '../../shared/chat.service';
import { environment } from '../../../../../environments/environment';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ai-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [RouterOutlet, RouterLink],
})
export class ChatComponent {
  constructor(private readonly chatService: ChatService) {
    if (environment.env === 'prod') {
      this.chatService.loadScript();
    } else {
      new AssistantIframe().init();
    }
  }
}
