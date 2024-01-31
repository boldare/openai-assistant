import { Component, Input } from '@angular/core';

@Component({
  selector: 'ai-chat-typing',
  standalone: true,
  templateUrl: './chat-typing.component.html',
  styleUrl: './chat-typing.component.scss',
})
export class ChatTypingComponent {
  @Input() isLoading = false;
}
