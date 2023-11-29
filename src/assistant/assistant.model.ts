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
