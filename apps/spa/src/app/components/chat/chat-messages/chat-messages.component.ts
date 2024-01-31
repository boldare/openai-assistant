import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Message } from '../../../modules/+chat/shared/chat.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatTypingComponent } from '../chat-typing/chat-typing.component';
import { ChatContentComponent } from '../chat-content/chat-content.component';

@Component({
  selector: 'ai-chat-messages',
  standalone: true,
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
  imports: [
    ChatMessageComponent,
    ChatTypingComponent,
    ChatContentComponent,
  ],
})
export class ChatMessagesComponent implements AfterViewInit, OnChanges {
  @Input() messages: Message[] = [];
  @Input() isLoading = false;
  @ViewChildren('item') item?: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.scrollDown();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      this.scrollDown();
    }
  }

  scrollDown(): void {
    setTimeout(() => {
      const lastChildElement = this.item?.last?.nativeElement;
      lastChildElement?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}
