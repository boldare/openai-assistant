import { Pipe, PipeTransform } from '@angular/core';
import { isTextContentBlock } from '../components/controls/message-content/message-content.helpers';
import { ChatMessage } from '../modules/+chat/shared/chat.model';

@Pipe({
  standalone: true,
  name: 'messageText'
})
export class MessageTextPipe implements PipeTransform {
  transform(message: ChatMessage): string {
    if (typeof message.content === 'string') {
      return message.content;
    }
  
    // @TODO: handle all types of message content
    return message.content
      .filter(isTextContentBlock)
      .map(block => block.text.value)
      .join(' ');
  }
}