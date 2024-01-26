import { registerAs } from '@nestjs/config';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfig } from '@boldare/assistant-ai';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/assistant-ai',
  instructions: `You are a chatbot assistant. Use the general knowledge to answer questions. Speak briefly and clearly.`,
  tools: [
    { type: 'code_interpreter' },
    { type: 'retrieval' },
  ],
  model: 'gpt-4-turbo-preview',
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
