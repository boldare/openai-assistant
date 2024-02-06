import { Component } from '@angular/core';
import { AssistantIframe } from '@boldare/ai-iframe';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ai-chat-example',
  standalone: true,
  templateUrl: './chat-example.component.html',
  styleUrl: './chat-example.component.scss',
})
export class ChatExampleComponent {
  iframe = new AssistantIframe({ url: `${environment.appUrl}/chat/iframe` });
}
