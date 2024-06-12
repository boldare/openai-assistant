import { Pipe, PipeTransform } from '@angular/core';
import {
  FileCitationAnnotation,
  FilePathAnnotation,
  MessageContent,
} from 'openai/resources/beta/threads';
import { isTextContentBlock } from '../components/controls/message-content/message-content.helpers';

export const isFileCitation = (item: {
  type: string;
}): item is FileCitationAnnotation => item.type === 'file_citation';

export const isFilePath = (item: {
  type: string;
}): item is FilePathAnnotation => item.type === 'file_path';

@Pipe({
  standalone: true,
  name: 'annotation',
  pure: false,
})
export class AnnotationPipe implements PipeTransform {
  transform(textContent: MessageContent): string {
    if (!isTextContentBlock(textContent)) {
      return '';
    }

    if (!textContent.text.annotations?.length) {
      return textContent.text.value;
    }

    let index = 1;

    for (const annotation of textContent.text.annotations) {
      const { text } = annotation;
      let fileId = null;

      if (isFileCitation(annotation)) {
        fileId = annotation.file_citation.file_id;
      }

      if (isFilePath(annotation)) {
        fileId = annotation.file_path.file_id;
      }

      const annotationBlock = `&nbsp;<u class="annotation">
        <span class="annotation__metadata">
          <span class="annotation__file-id">${fileId}</span>
          <span class="annotation__type">${annotation?.type}</span>
        </span>
        <span class="annotation__text">[${index}]</span>
      </u>`;

      textContent.text.value = textContent.text.value.replace(
        text,
        annotationBlock,
      );

      index++;
    }

    return textContent.text.value;
  }
}
