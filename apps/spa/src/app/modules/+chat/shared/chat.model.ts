import { FormControl } from '@angular/forms';
import { ThreadCreateParams } from 'openai/resources/beta';

export interface MessageResponse {
  content: string;
}

export interface MessagePayload {
  content: string;
  threadId: string;
}

export interface AudioPayload {
  file: File;
  threadId: string;
}

export interface AudioResponse {
  content: string;
  threadId: string;
}

export interface SpeechResponse {
  content: string;
  filename: string;
}

export enum ChatRole {
  User = 'user',
  Assistant = 'assistant',
}

export interface MessageHistory {
  content: string;
  role: ChatRole;
}

export interface ThreadResponse {
  id: string;
}

export interface ThreadConfig {
  messages?: ThreadCreateParams.Message[];
}

export enum ChatEvents {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
}

export interface ChatConfigForm {
  firstName: FormControl<string | null>;
}
