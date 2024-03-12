import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfigParams } from './assistant.model';

export const assistantParamsMock: AssistantCreateParams = {
  name: '@boldare/tests',
  instructions: `test instructions`,
  tools: [{ type: 'retrieval' }],
  model: 'gpt-3.5-turbo',
  metadata: {},
};

export const assistantConfigMock: AssistantConfigParams = {
  id: 'test1234',
  params: assistantParamsMock,
  filesDir: './apps/api/src/app/knowledge',
  files: [],
};
