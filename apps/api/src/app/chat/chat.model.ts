import { ThreadCreateParams } from 'openai/resources/beta';

export interface ChatCall {
  content: string;
  threadId: string;
}

export enum Events {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
}

export interface GetThreadParams {
  id: string;
}

export interface ThreadConfig {
  messages?: ThreadCreateParams.Message[];
}
