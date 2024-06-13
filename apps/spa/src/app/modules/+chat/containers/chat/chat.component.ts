import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ChatIframeWrapperComponent } from '../../../../components/chat/chat-iframe-wrapper/chat-iframe-wrapper.component';
import { ChatIframeComponent } from '../chat-iframe/chat-iframe.component';

@Component({
  selector: 'ai-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    ChatIframeComponent,
    ChatIframeWrapperComponent,
    RouterModule,
  ],
})
export class ChatComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    window.onmessage = event => {
      if (event.data == 'changeView') {
        window.location.href = this.router.url === '/chat' ? '/' : '/chat';
      }
    };
  }
}
