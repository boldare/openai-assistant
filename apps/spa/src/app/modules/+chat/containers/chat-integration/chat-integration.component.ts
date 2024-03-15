import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { MarkdownComponent, MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'ai-chat-integration',
  standalone: true,
  templateUrl: './chat-integration.component.html',
  styleUrl: './chat-integration.component.scss',
  imports: [MarkdownComponent, MarkdownPipe, AsyncPipe],
})
export class ChatIntegrationComponent {
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
}
