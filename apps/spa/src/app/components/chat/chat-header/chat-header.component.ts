import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'ai-chat-header',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatTooltip],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  @Output() close$ = new EventEmitter();
  @Output() refresh$ = new EventEmitter();
  @Output() config$ = new EventEmitter();
  @Input() isRefreshEnabled = true;
  @Input() isConfigEnabled = true;

  close(): void {
    this.close$.emit();
    parent.postMessage({ type: 'chatbot.close' }, '*');
  }
}
