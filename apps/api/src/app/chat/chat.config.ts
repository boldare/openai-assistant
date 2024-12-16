import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfigParams } from '@boldare/openai-assistant';
import 'dotenv/config';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/openai-assistant',
  instructions: `You are a chatbot assistant. Use the general knowledge to answer questions. Speak briefly and clearly.`,
  tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
  model: 'gpt-4o-mini',
  temperature: 0.05,
};

export const assistantConfig: AssistantConfigParams = {
  id: process.env['ASSISTANT_ID'] || '',
  params: assistantParams,
  assistantPrefix: 'assistant-prefix',
  filesDir: './apps/api/src/app/knowledge',
  toolResources: {
    fileSearch: {
      fileNames: [
        '33-things-to-ask-your-digital-product-development-partner.md',
      ],
    },
    codeInterpreter: {
      fileNames: [],
    },
  },
};
