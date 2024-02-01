import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatTipComponent } from '../chat-tip/chat-tip.component';

@Component({
  selector: 'ai-chat-tips',
  standalone: true,
  templateUrl: './chat-tips.component.html',
  styleUrl: './chat-tips.component.scss',
  imports: [
    ChatTipComponent,
  ],
})
export class ChatTipsComponent {
  @Input() tips: string[] = [];
  @Output() tipSelected$ = new EventEmitter<string>();
}
