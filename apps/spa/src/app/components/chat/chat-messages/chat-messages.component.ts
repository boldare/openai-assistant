import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Message } from '../../../modules/+chat/shared/chat.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatTypingComponent } from '../chat-typing/chat-typing.component';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { ChatTipsComponent } from '../chat-tips/chat-tips.component';

@Component({
  selector: 'ai-chat-messages',
  standalone: true,
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
  imports: [
    ChatMessageComponent,
    ChatTypingComponent,
    ChatContentComponent,
    ChatTipsComponent,
  ],
})
export class ChatMessagesComponent implements AfterViewInit, OnChanges {
  @Input() messages: Message[] = [];
  @Input() isTyping = false;
  @Input() tips: string[] = [];
  @Output() tipSelected$ = new EventEmitter<string>();
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
