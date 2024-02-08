import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfigParams } from '@boldare/ai-assistant';
import 'dotenv/config';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/ai-assistant',
  instructions: `You are a chatbot assistant. Use the general knowledge to answer questions. Speak briefly and clearly.`,
  tools: [{ type: 'code_interpreter' }, { type: 'retrieval' }],
  model: 'gpt-4-1106-preview',
  metadata: {},
};

export const assistantConfig: AssistantConfigParams = {
  id: process.env['ASSISTANT_ID'] || '',
  params: assistantParams,
  filesDir: './apps/api/src/app/knowledge',
  files: [],
};
