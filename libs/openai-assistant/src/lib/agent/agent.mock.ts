import { FunctionTool } from 'openai/resources/beta';

export const agentNameMock = 'agent-name';

export const agentMock = async () => 'agent-result';

export const definitionMock: FunctionTool = {
  type: 'function',
  function: { name: agentNameMock },
};
