import { Component } from '@angular/core';
import { ChatIframeComponent } from '../chat-iframe/chat-iframe.component';

@Component({
  selector: 'ai-chat-home',
  standalone: true,
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.scss',
  imports: [ChatIframeComponent],
})
export class ChatHomeComponent {}
