import { ThreadCreateParams } from 'openai/resources/beta';

export interface GetThreadParams {
  id: string;
}

export interface ThreadConfig {
  messages?: ThreadCreateParams.Message[];
}
