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
  CallStart = 'callStart',
  CallDone = 'callDone',
  MessageCreated = 'messageCreated',
  MessageDelta = 'messageDelta',
  MessageDone = 'messageDone',
  TextCreated = 'textCreated',
  TextDelta = 'textDelta',
  TextDone = 'textDone',
  ImageFileDone = 'imageFileDone',
  ToolCallCreated = 'toolCallCreated',
  ToolCallDelta = 'toolCallDelta',
  ToolCallDone = 'toolCallDone',
  RunStepCreated = 'runStepCreated',
  RunStepDelta = 'runStepDelta',
  RunStepDone = 'runStepDone',
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
