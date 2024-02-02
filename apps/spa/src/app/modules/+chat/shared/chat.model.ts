import { ThreadCreateParams } from 'openai/resources/beta';

export interface AudioResponse {
  content: string;
}

export enum ChatRole {
  User = 'user',
  Assistant = 'assistant',
}

export interface Message {
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
