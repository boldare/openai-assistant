export interface ChatCall {
  content: string;
  threadId: string;
  file_ids?: string[];
  metadata?: Record<string, unknown>;
}

export interface ChatAudio {
  file: File;
  threadId: string;
}

export interface ChatCallResponse {
  content: string;
  threadId: string;
}

export interface ChatAudioResponse {
  type: 'buffer';
  data: number[];
}

export enum ChatEvents {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
  SendAudio = 'send_audio',
  AudioReceived = 'audio_received',
}

export enum MessageStatus {
  Invisible = 'invisible',
}
