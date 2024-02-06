import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ai-chat-trigger',
  standalone: true,
  templateUrl: './chat-trigger.component.html',
  styleUrl: './chat-trigger.component.scss',
})
export class ChatTriggerComponent {
  @HostBinding('class.ai-assistant-toggle') isTrigger = true;
  @HostBinding('class.is-animated') @Input() isAnimated = true;
}
