import { Component } from '@angular/core';
import { AssistantIframe } from '@boldare/assistant-iframe';

@Component({
  selector: 'ai-chat-example',
  standalone: true,
  templateUrl: './chat-example.component.html',
  styleUrl: './chat-example.component.scss',
})
export class ChatExampleComponent {
  iframe = new AssistantIframe({ url: 'http://localhost:4200/chat/iframe' });
}


