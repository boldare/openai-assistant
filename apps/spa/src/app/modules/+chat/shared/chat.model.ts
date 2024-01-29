import { FormControl } from '@angular/forms';
import { ThreadCreateParams } from 'openai/resources/beta';
import { SpeechVoice } from '@boldare/assistant-ai';

export interface AudioResponse {
  content: string;
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
  voice: FormControl<SpeechVoice>;
}
