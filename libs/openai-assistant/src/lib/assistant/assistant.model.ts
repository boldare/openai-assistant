import { AssistantCreateParams } from 'openai/resources/beta';
import { RequestOptions } from 'openai/core';

export interface AssistantConfigParams {
  id: string;
  params: AssistantCreateParams;
  options?: RequestOptions;
  filesDir?: string;
  toolResources?: AssistantToolResources | null;
}

export interface AssistantToolResources {
  fileSearch?: AssistantFileSearch;
  codeInterpreter?: AssistantCodeInterpreter;
}

export interface AssistantUpdate {
  toolResources: AssistantToolResources;
}

export type AssistantFileSearch = Record<string, string[]> | null;
export type AssistantCodeInterpreter = Record<'fileNames', string[]> | null;
