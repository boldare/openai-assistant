import { definitionMock } from './agent.mock';
import { AgentService } from './agent.service';
import { AgentBase } from './agent.base';
import { AgentData } from './agent.model';

describe('AgentBase', () => {
  let agentBase: AgentBase;
  let agentService: AgentService;

  beforeEach(() => {
    agentService = new AgentService();
    agentBase = new AgentBase(agentService);
  });

  describe('onModuleInit', () => {
    it('should call agentService.add with definition and output', () => {
      const addSpy = jest.spyOn(agentService, 'add');
      agentBase.definition = definitionMock;

      agentBase.onModuleInit();

      expect(addSpy).toHaveBeenCalledWith(definitionMock, expect.any(Function));
    });
  });

  describe('output', () => {
    it('should return empty string when params are missing', async () => {
      const result = await agentBase.output({} as AgentData);

      expect(result).toBe('');
    });

    it('should return params when they are provided', async () => {
      const result = await agentBase.output({ params: 'test' } as AgentData);

      expect(result).toBe('test');
    });
  });
});
