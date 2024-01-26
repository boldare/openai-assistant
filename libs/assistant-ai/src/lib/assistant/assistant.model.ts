import { AssistantCreateParams } from 'openai/resources/beta';
import { RequestOptions } from 'openai/core';

export interface AssistantConfig {
  id: string;
  params: AssistantCreateParams;
  options?: RequestOptions;
  filesDir?: string;
  files?: string[];
}

export interface AssistantFiles {
  files?: string[];
}

export interface SpeechPayload {
  content: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

export interface ChatCall {
  content: string;
  threadId: string;
  file_ids?: string[];
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
  type: 'buffer',
  data: number[];
}

