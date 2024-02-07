import { Component } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { environment } from '../../../../../environments/environment';
import { MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { AsyncPipe } from '@angular/common';
import { AssistantIframe } from '@boldare/ai-embedded';

@Component({
  selector: 'ai-chat-example',
  standalone: true,
  templateUrl: './chat-example.component.html',
  styleUrl: './chat-example.component.scss',
  imports: [
    MarkdownComponent,
    MarkdownPipe,
    AsyncPipe,
  ],
})
export class ChatExampleComponent {
  scriptMarkdown = `\`\`\`html
<script
  src="${environment.appUrl}/assets/js/ai-embedded.js"
  data-chat-initial="true"
  defer
></script>
\`\`\``;

  scriptDataAttrMarkdown = `\`\`\`javascript
data-chat-initial="true"
\`\`\``;

  manualInitialization = `\`\`\`javascript
new AssistantIframe({
  url: \`${environment.appUrl}/chat/iframe\`
}).init();
\`\`\``;

  constructor(private readonly chatService: ChatService) {
    if (environment.env === 'prod') {
      this.chatService.loadScript();
    } else {
      new AssistantIframe().init();
    }
  }
}
