import { assistantConfigMock } from './assistant.mock';
import { AssistantService } from './assistant.service';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { AiService } from '../ai';
import { ConfigService } from '../config';
import { AgentService } from '../agent';
import { definitionMock } from '../agent/agent.mock';
import { Assistant } from 'openai/resources/beta';

jest.mock('../config', () => ({
  ConfigService: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue(assistantConfigMock),
  }),
}));

describe('AssistantService', () => {
  let assistantService: AssistantService;
  let aiService: AiService;
  let assistantFilesService: AssistantFilesService;
  let assistantMemoryService: AssistantMemoryService;
  let configService: ConfigService;
  let agentService: AgentService;

  beforeEach(() => {
    aiService = new AiService();
    configService = new ConfigService();
    agentService = new AgentService();
    assistantFilesService = new AssistantFilesService(configService, aiService);
    assistantMemoryService = new AssistantMemoryService();
    assistantService = new AssistantService(
      aiService,
      assistantFilesService,
      assistantMemoryService,
      configService,
      agentService,
    );

    jest
      .spyOn(aiService.provider.beta.assistants, 'create')
      .mockResolvedValue({} as Assistant);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AssistantService).toBeDefined();
  });

  describe('getParams', () => {
    it('should return assistant params with combined tools', () => {
      agentService.tools = [definitionMock];
      const result = assistantService.getParams();

      expect(result).toEqual({
        ...assistantConfigMock.params,
        tools: [...(assistantConfigMock.params.tools || []), definitionMock],
      });
    });
  });
});
