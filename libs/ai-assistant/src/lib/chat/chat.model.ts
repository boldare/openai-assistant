import { ApiProperty } from '@nestjs/swagger';

export interface ChatAudio {
  file: File;
}

export interface ChatAudioResponse {
  type: 'buffer';
  data: number[];
}

export enum ChatEvents {
  SendMessage = 'send_message',
  MessageReceived = 'message_received',
}

export enum MessageStatus {
  Invisible = 'invisible',
}

export class ChatCallResponseDto {
  @ApiProperty()
  threadId: string;

  @ApiProperty()
  content: string;
}

export class ChatCallDto {
  @ApiProperty()
  threadId: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  file_ids?: string[];

  @ApiProperty({ required: false })
  metadata?: unknown | null;
}
