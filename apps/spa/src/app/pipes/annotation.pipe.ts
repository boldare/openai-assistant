import { Pipe, PipeTransform } from '@angular/core';
import { MessageWithAnnotations } from '@boldare/openai-assistant';
import { Message } from 'openai/resources/beta/threads';
import { isTextContentBlock } from '../components/controls/message-content/message-content.helpers';

@Pipe({
  standalone: true,
  name: 'annotation'
})
export class AnnotationPipe implements PipeTransform {
  transform(event: MessageWithAnnotations<{ message: Message }>): string {
    if (!isTextContentBlock(event.data.message.content[0])) {
      return '';
    }

    const { text } = event.data.message.content[0];
    
    if (!event.annotations?.length) {
      return text.value;
    }

    for (const item of event.annotations) {
      const { index, annotation } = item;
      text.value = text.value.replace(annotation.text, `[${index}]`);
    }

    return text.value;
  }
}