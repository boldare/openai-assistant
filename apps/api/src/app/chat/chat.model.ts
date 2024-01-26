import { ThreadCreateParams } from 'openai/resources/beta';

export enum Events {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
  SendAudio = 'send_audio',
  AudioReceived = 'audio_received',
}

export interface GetThreadParams {
  id: string;
}

export interface ThreadConfig {
  messages?: ThreadCreateParams.Message[];
}
