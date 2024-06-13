import { Pipe, PipeTransform } from '@angular/core';
import { isImageFileContentBlock } from '../components/controls/message-content/message-content.helpers';
import { ChatMessage } from '../modules/+chat/shared/chat.model';
import { ImageFileContentBlock } from 'openai/resources/beta/threads';

@Pipe({
  standalone: true,
  name: 'messageImageFile',
  pure: true,
})
export class MessageImageFilePipe implements PipeTransform {
  transform(message: Partial<ChatMessage>): ImageFileContentBlock[] {
    if (typeof message.content === 'string') {
      return [];
    }

    return message?.content?.filter(isImageFileContentBlock) || [];
  }
}
