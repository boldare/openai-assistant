export interface AudioResponse {
  content: string;
}

export enum ChatRole {
  User = 'user',
  Assistant = 'assistant',
  System = 'system',
}

export interface ChatMessage {
  metadata?: Record<string, unknown>;
  content: string;
  role: ChatRole;
}

export enum ChatEvents {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
}

export enum ChatMessageStatus {
  Invisible = 'invisible',
}

export enum SpeechVoice {
  Alloy = 'alloy',
  Echo = 'echo',
  Fable = 'fable',
  Onyx = 'onyx',
  Nova = 'nova',
  Shimmer = 'shimmer',
}
