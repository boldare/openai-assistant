import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MessageContent } from 'openai/resources/beta/threads';
import { ChatAnnotationComponent } from '../chat-annotation/chat-annotation.component';

@Component({
  selector: 'ai-chat-annotations',
  standalone: true,
  templateUrl: './chat-annotations.component.html',
  styleUrl: './chat-annotations.component.scss',
  imports: [MatTooltip, ChatAnnotationComponent],
})
export class ChatAnnotationsComponent {
  @Input() message!: MessageContent;
}
