import { Transcription } from 'openai/resources/audio';

export const enum SpeechVoice {
  Alloy = 'alloy',
  Echo = 'echo',
  Fable = 'fable',
  Onyx = 'onyx',
  Nova = 'nova',
  Shimmer = 'shimmer',
}

export interface SpeechPayload {
  content: string;
  voice?: SpeechVoice;
}

export type AiTranscription =  Transcription;
