import { ThreadCreateParams } from 'openai/resources/beta';
import { ThreadMessage } from 'openai/resources/beta/threads';

export interface GetThreadParams {
  id: string;
}

export interface ThreadConfig {
  messages?: ThreadCreateParams.Message[];
}

export interface ThreadResponse {
  id: string;
  messages: ThreadMessage[];
}
