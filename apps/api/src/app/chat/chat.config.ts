import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfigParams } from '@boldare/assistant-ai';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/assistant-ai',
  instructions: `You are a chatbot assistant. Use the general knowledge to answer questions. Speak briefly and clearly.`,
  tools: [],
  model: 'gpt-3.5-turbo',
  metadata: {},
};

export const assistantConfig: AssistantConfigParams = {
  id: process.env.ASSISTANT_ID || '',
  params: assistantParams,
  filesDir: './apps/api/src/app/knowledge',
  files: [],
}
