import { Transcription } from 'openai/resources/audio';
import { ApiProperty } from '@nestjs/swagger';

export enum SpeechVoice {
  Alloy = 'alloy',
  Echo = 'echo',
  Fable = 'fable',
  Onyx = 'onyx',
  Nova = 'nova',
  Shimmer = 'shimmer',
}

export class PostSpeechDto {
  @ApiProperty({ description: 'Content of the message' })
  content!: string;

  @ApiProperty({
    description: 'Voice of the message author.',
    enum: SpeechVoice,
    required: false,
  })
  voice?: SpeechVoice;
}

export class PostSpeechResponseDto {
  @ApiProperty()
  type!: 'buffer';

  @ApiProperty({ type: 'number', isArray: true })
  data!: number[];
}

export class PostTranscriptionDto {
  @ApiProperty({type: 'string', format: 'binary'})
  file!: File;
}

export class PostTranscriptionResponseDto {
  @ApiProperty({ description: 'Transcription of the audio file' })
  content!: string;
}

export type AiTranscription = Transcription;
