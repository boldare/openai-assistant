import { AfterViewInit, Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { ChatIframeComponent } from '../../../../components/chat/chat-iframe/chat-iframe.component';
import { ChatTriggerComponent } from '../../../../components/chat/chat-trigger/chat-trigger.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatService } from '../../shared/chat.service';

@Component({
  selector: 'ai-chat-example',
  standalone: true,
  imports: [
    ChatComponent,
    ChatIframeComponent,
    ChatTriggerComponent,
  ],
  templateUrl: './chat-example.component.html',
  styleUrl: './chat-example.component.scss',
})
export class ChatExampleComponent implements AfterViewInit {
  isVisible = toSignal(this.chatService.isVisible$, { initialValue: true });

  constructor(public readonly chatService: ChatService) {}

  ngAfterViewInit(): void {
    const iframe: HTMLIFrameElement = document.getElementById('ai-chat-iframe') as HTMLIFrameElement;

    if (!iframe) {
      console.warn('AI Chatbot is not initialized');
      return;
    }


    iframe.addEventListener( 'load', () => {
      this.setInitialState();
      this.watchCloseButton();
    });
  }

  watchCloseButton(): void {
    const iframe: HTMLIFrameElement = document.getElementById('ai-chat-iframe') as HTMLIFrameElement;
    const closeButton = iframe?.contentDocument?.getElementsByClassName('js-ai-chat--close');

    if (closeButton?.length) {
      closeButton[0].addEventListener('click', () => this.toggleModal());
    }
  }

  setInitialState(): void {
    const iframe: HTMLIFrameElement = document.getElementById('ai-chat-iframe') as HTMLIFrameElement;
    const chatOpenClass = 'ai-chat-open';
    const isVisible = document.body.classList.contains(chatOpenClass);

    if (isVisible) {
      document.body.classList.add(chatOpenClass);
      iframe.style.display = 'block';
    } else {
      document.body.classList.remove(chatOpenClass);
      iframe.style.display = 'none';
    }
  }

  toggleModal():void {
    const iframe: HTMLIFrameElement = document.getElementById('ai-chat-iframe') as HTMLIFrameElement;
    const chatOpenClass = 'ai-chat-open';
    const isVisible = document.body.classList.contains(chatOpenClass);

    if (!isVisible) {
      document.body.classList.add(chatOpenClass);
      iframe.style.display = 'block';
    } else {
      document.body.classList.remove(chatOpenClass);
      iframe.style.display = 'none';
    }
  }
}
