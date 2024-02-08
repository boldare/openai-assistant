import { AgentService } from './agent.service';
import { AssistantCreateParams } from 'openai/resources/beta';

describe('AgentService', () => {
  let agentService: AgentService;
  const agentNameMock = 'agent-name';
  const agentMock = async () => 'agent-result';
  const definitionMock: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: { name: agentNameMock },
  };

  beforeEach(() => {
    agentService = new AgentService();
  });

  describe('add', () => {
    it('should add new tool', async () => {
      agentService.add(definitionMock, agentMock);
      expect(agentService.tools).toContain(definitionMock);
    });

    it('should add new agent', async () => {
      agentService.add(definitionMock, agentMock);
      expect(agentService.agents[agentNameMock]).toEqual(agentMock);
    });
  });

  describe('get', () => {
    it('should return agent', async () => {
      agentService.add(definitionMock, agentMock);
      expect(agentService.get(agentNameMock)).toEqual(agentMock);
    });
  });
});
