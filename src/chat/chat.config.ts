import { registerAs } from '@nestjs/config';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfig } from '../assistant/assistant.model';

export const assistantParams: AssistantCreateParams = {
  name: 'Pokemon Assistant',
  instructions: `You can ask questions about Pokemon. For example, "What is Pikachu's type?" or "What is Pikachu's base stats?", or "Which pokemon has a bigger chance of winning in a battle between Pikachu and Charmander?".`,
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
