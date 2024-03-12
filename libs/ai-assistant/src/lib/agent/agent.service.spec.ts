import { AgentService } from './agent.service';
import { agentMock, agentNameMock, definitionMock } from './agent.mock';

describe('AgentService', () => {
  let agentService: AgentService;

  beforeEach(() => {
    agentService = new AgentService();
  });

  it('should be defined', () => {
    expect(agentService).toBeDefined();
  });

  it('agentMock should be return value', async () => {
    const result = await agentMock();

    expect(result).toEqual('agent-result');
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
