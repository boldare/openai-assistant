import {
  ImageFileContentBlock,
  MessageContent,
  MessageCreateParams,
} from 'openai/resources/beta/threads';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { ChatMessage, ChatRole } from './chat.model';
import { CodeInterpreterTool, FileSearchTool } from 'openai/resources/beta';

export const textContentBlock = (content: string): TextContentBlock => ({
  type: 'text',
  text: {
    value: content,
    annotations: [],
  },
});

export const imageFileContentBlock = (
  fileId: string,
): ImageFileContentBlock => ({
  type: 'image_file',
  image_file: {
    file_id: fileId,
  },
});

export const messageAttachment = (
  fileId: string,
  tools: Array<CodeInterpreterTool | FileSearchTool> = [
    { type: 'code_interpreter' },
  ],
): MessageCreateParams.Attachment => ({
  file_id: fileId,
  tools,
});

export const messageContentBlock = (
  content: MessageContent[],
  role: ChatRole,
): Partial<ChatMessage> => ({
  content,
  role,
});
