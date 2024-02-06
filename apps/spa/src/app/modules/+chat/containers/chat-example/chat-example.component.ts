import { Component } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { environment } from '../../../../../environments/environment';
import { MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { AsyncPipe } from '@angular/common';

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
  markdown = `\`\`\`html
<script
  src="${environment.appUrl}/assets/js/ai-embedded.js"
  type="module"
  defer
></script>
\`\`\``;

  constructor(private readonly chatService: ChatService,) {
    this.chatService.loadScript();
  }
}
