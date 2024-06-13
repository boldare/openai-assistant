import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { ImageFileContentBlock } from 'openai/src/resources/beta/threads/messages';

export function isTextContentBlock(item?: {
  type?: string;
}): item is TextContentBlock {
  return item?.type === 'text';
}

export function isImageFileContentBlock(item?: {
  type?: string;
}): item is ImageFileContentBlock {
  return item?.type === 'image_file';
}
