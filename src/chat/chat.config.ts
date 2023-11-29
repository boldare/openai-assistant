import { registerAs } from '@nestjs/config';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfig } from '../assistant/assistant.model';

export const assistantParams: AssistantCreateParams = {
  name: 'AI Template',
  instructions: `You are a personal assistant.`,
  tools: [{ type: 'retrieval' }],
  model: 'gpt-4-1106-preview',
  metadata: {},
};

export const chatConfig = registerAs(
  'assistant',
  (): AssistantConfig => ({
    id: process.env.ASSISTANT_ID || '',
    params: assistantParams,
    filesDir: './src/knowledge',
    files: ['about-us.txt'],
  }),
);
