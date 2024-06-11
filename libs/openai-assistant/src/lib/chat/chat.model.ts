import { ApiProperty } from '@nestjs/swagger';
import {
  ImageFile,
  Message,
  MessageContent,
  MessageCreateParams,
  MessageDelta,
  Text,
  TextDelta,
} from 'openai/resources/beta/threads';
import {
  RunStepDelta,
  ToolCall,
  ToolCallDelta,
} from 'openai/resources/beta/threads/runs';
import { RunStep } from 'openai/resources/beta/threads/runs/steps';
import { AnnotationData } from '../annotations/annotations.model';

export interface ChatAudio {
  file: File;
}

export interface ChatAudioResponse {
  type: 'buffer';
  data: number[];
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

export enum MessageStatus {
  Invisible = 'invisible',
}

export class ChatCallResponseDto {
  @ApiProperty()
  threadId!: string;

  @ApiProperty()
  content!: string;
}

export class ChatCallDto {
  @ApiProperty()
  threadId!: string;

  @ApiProperty()
  content!: string | Array<MessageContent>;

  @ApiProperty({ required: false })
  assistantId?: string;

  @ApiProperty({ required: false })
  attachments?: Array<MessageCreateParams.Attachment> | null;

  @ApiProperty({ required: false })
  metadata?: unknown | null;
}

export interface MessageCreatedPayload {
  message: Message;
}

export interface MessageDeltaPayload {
  message: Message;
  messageDelta: MessageDelta;
}

export interface MessageDonePayload {
  message: Message;
}

export interface TextCreatedPayload {
  text: Text;
}

export interface TextDeltaPayload {
  textDelta: TextDelta;
  text: Text;
}

export interface TextDonePayload {
  text: Text;
  message: Message;
}

export interface ToolCallCreatedPayload {
  toolCall: ToolCall;
}

export interface ToolCallDeltaPayload {
  toolCall: ToolCall;
  toolCallDelta: ToolCallDelta;
}

export interface ToolCallDonePayload {
  toolCall: ToolCall;
}

export interface ImageFileDonePayload {
  content: ImageFile;
  message: Message;
}

export interface RunStepCreatedPayload {
  runStep: RunStep;
}

export interface RunStepDeltaPayload {
  runStep: RunStep;
  runStepDelta: RunStepDelta;
}

export interface RunStepDonePayload {
  runStep: RunStep;
}

export interface ChatCallCallbacks {
  [ChatEvents.MessageCreated]?: (data: MessageCreatedPayload) => Promise<void>;
  [ChatEvents.MessageDelta]?: (data: MessageDeltaPayload) => Promise<void>;
  [ChatEvents.MessageDone]?: (data: MessageDonePayload) => Promise<void>;
  [ChatEvents.TextCreated]?: (data: TextCreatedPayload) => Promise<void>;
  [ChatEvents.TextDelta]?: (data: TextDeltaPayload) => Promise<void>;
  [ChatEvents.TextDone]?: (data: TextDonePayload) => Promise<void>;
  [ChatEvents.ToolCallCreated]?: (
    data: ToolCallCreatedPayload,
  ) => Promise<void>;
  [ChatEvents.ToolCallDelta]?: (data: ToolCallDeltaPayload) => Promise<void>;
  [ChatEvents.ToolCallDone]?: (data: ToolCallDonePayload) => Promise<void>;
  [ChatEvents.ImageFileDone]?: (data: ImageFileDonePayload) => Promise<void>;
  [ChatEvents.RunStepCreated]?: (data: RunStepCreatedPayload) => Promise<void>;
  [ChatEvents.RunStepDelta]?: (data: RunStepDeltaPayload) => Promise<void>;
  [ChatEvents.RunStepDone]?: (data: RunStepDonePayload) => Promise<void>;
}

export interface MessageWithAnnotations<T> {
  data: T;
  annotations: AnnotationData[];
}