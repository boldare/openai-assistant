import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  ImageFileContentBlock,
  Message,
  MessageCreateParams,
  TextContentBlock,
} from 'openai/resources/beta/threads';

export class GetThreadDto {
  @ApiProperty({ description: 'Unique identifier of the thread.' })
  @IsOptional()
  id!: string;
}

export class CreateThreadMessage {
  @ApiProperty({ description: 'Content of the message' })
  content!: string;

  @ApiProperty({ description: 'Role of the message author.', enum: ['user'] })
  role!: 'user';

  @ApiProperty({ description: 'OpenAI Attachments', required: false })
  attachments?: Array<MessageCreateParams.Attachment> | null;

  @ApiProperty({ description: 'Metadata', required: false })
  metadata: unknown | null;
}

export class CreateThreadDto {
  @ApiProperty({
    description: 'Messages in the thread.',
    type: CreateThreadMessage,
    isArray: true,
    required: false,
  })
  messages?: CreateThreadMessage[];
}

export class ThreadMessage {
  @ApiProperty({ description: 'Unique identifier of the thread.' })
  id!: string;

  @ApiProperty({ description: 'Identifier of the assistant' })
  assistant_id!: string | null;

  @ApiProperty({
    description: 'Content of the message in array of text and/or images.',
  })
  content!: Array<ImageFileContentBlock | TextContentBlock>;

  @ApiProperty({
    description: 'Role of the message author.',
    enum: ['user', 'assistant'],
  })
  role!: 'user' | 'assistant';

  @ApiProperty({ description: 'OpenAI Attachments' })
  attachments?: Array<MessageCreateParams.Attachment> | null;

  @ApiProperty({ description: 'Metadata' })
  metadata: unknown | null;

  @ApiProperty({ description: 'Datetime the message was created.' })
  created_at!: number;

  @ApiProperty()
  object!: 'thread.message';

  @ApiProperty({ description: 'Run ID' })
  run_id!: string | null;

  @ApiProperty({ description: 'Thread ID' })
  thread_id!: string;
}

export class GetThreadResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the thread.',
  })
  id!: string;

  @ApiProperty({
    description: 'Messages in the thread.',
    type: ThreadMessage,
    isArray: true,
  })
  messages!: Message[];
}

export class CreateThreadResponseDto {
  @ApiProperty({ description: 'Unique identifier of the thread.' })
  id!: string;

  @ApiProperty({ description: 'Datetime the message was created.' })
  created_at!: number;

  @ApiProperty({ description: 'Metadata' })
  metadata: unknown | null;

  @ApiProperty()
  object!: 'thread';
}
