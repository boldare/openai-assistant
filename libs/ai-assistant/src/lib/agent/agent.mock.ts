import { AssistantCreateParams } from 'openai/resources/beta';

export const agentNameMock = 'agent-name';

export const agentMock = async () => 'agent-result';

export const definitionMock: AssistantCreateParams.AssistantToolsFunction = {
  type: 'function',
  function: { name: agentNameMock },
};
