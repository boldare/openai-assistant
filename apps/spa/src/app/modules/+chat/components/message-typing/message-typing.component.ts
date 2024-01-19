import { Component, Input } from '@angular/core';

@Component({
  selector: 'ai-message-typing',
  standalone: true,
  imports: [],
  templateUrl: './message-typing.component.html',
  styleUrl: './message-typing.component.scss',
})
export class MessageTypingComponent {
  @Input() isLoading = false;
}
