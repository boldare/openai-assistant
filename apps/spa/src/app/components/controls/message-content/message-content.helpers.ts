import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { ImageFileContentBlock } from 'openai/src/resources/beta/threads/messages';
import { ChatMessage } from '../../../modules/+chat/shared/chat.model';

export function isTextContentBlock(item: {
  type: string;
}): item is TextContentBlock {
  return item.type === 'text';
}

export function isImageFileContentBlock(item: {
  type: string;
}): item is ImageFileContentBlock {
  return item.type === 'image_file';
}

export const getMessageText = (message: ChatMessage): string => {
  if (typeof message.content === 'string') {
    return message.content;
  }

  // @TODO: handle all types of message content
  return message.content
    .filter(isTextContentBlock)
    .map(block => block.text.value)
    .join(' ');
};

export const getMessageImage = (
  message: ChatMessage,
): ImageFileContentBlock[] => {
  if (typeof message.content === 'string') {
    return [];
  }

  return message.content.filter(isImageFileContentBlock);
};
