import { registerAs } from '@nestjs/config';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfig } from '@boldare/assistant-ai';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/assistant-ai',
  instructions: `You are a chatbot assistant.`,
  tools: [{ type: 'retrieval' }],
  model: 'gpt-3.5-turbo-1106',
  metadata: {},
};

export const chatConfig = registerAs(
  'assistant',
  (): AssistantConfig => ({
    id: process.env.ASSISTANT_ID || '',
    params: assistantParams,
    filesDir: './apps/api/src/app/knowledge',
    files: [],
  }),
);
