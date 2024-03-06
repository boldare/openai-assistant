import { Assistant } from 'openai/resources/beta';
import { assistantConfigMock } from './assistant.mock';
import { AssistantService } from './assistant.service';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { AiService } from '../ai';
import { ConfigService } from '../config';
import { AgentService } from '../agent';
import { definitionMock } from '../agent/agent.mock';
import { AssistantConfigParams } from './assistant.model';

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

  describe('init', () => {
    it('should create assistant when provided ID is wrong', async () => {
      jest
        .spyOn(aiService.provider.beta.assistants, 'update')
        .mockRejectedValueOnce('error');
      jest.spyOn(assistantService, 'create').mockResolvedValueOnce(undefined);

      await assistantService.init();

      expect(assistantService.create).toHaveBeenCalled();
    });

    it('should update the assistant when provided correct ID', async () => {
      jest
        .spyOn(aiService.provider.beta.assistants, 'update')
        .mockResolvedValue({} as Assistant);

      await assistantService.init();

      expect(configService.get().id).toBeDefined();
      expect(aiService.provider.beta.assistants.update).toHaveBeenCalled();
    });

    it('should create the assistant when not provided the assistant ID', async () => {
      jest
        .spyOn(configService, 'get')
        .mockReturnValue({ ...assistantConfigMock, id: '' });

      jest.spyOn(assistantService, 'create').mockResolvedValueOnce(undefined);

      await assistantService.init();

      expect(configService.get().id).toBeDefined();
      expect(assistantService.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update assistant', async () => {
      assistantService.assistant = { id: '1', model: 'model' } as Assistant;
      jest
        .spyOn(aiService.provider.beta.assistants, 'update')
        .mockResolvedValue({ id: '2', model: 'new-model' } as Assistant);

      await assistantService.update({ model: 'new-model' });

      expect(aiService.provider.beta.assistants.update).toHaveBeenCalled();
      expect(assistantService.assistant.id).toEqual('2');
      expect(assistantService.assistant.model).toEqual('new-model');
    });
  });

  describe('create', () => {
    it('should create assistant', async () => {
      jest
        .spyOn(assistantService, 'updateFiles')
        .mockResolvedValue({} as Assistant);

      await assistantService.create();

      expect(aiService.provider.beta.assistants.create).toHaveBeenCalled();
    });

    it('should not upload files when list is empty', async () => {
      jest
        .spyOn(assistantService, 'updateFiles')
        .mockResolvedValue({} as Assistant);

      await assistantService.create();

      expect(assistantService.updateFiles).not.toHaveBeenCalled();
    });

    it('should upload files', async () => {
      jest.spyOn(configService, 'get').mockReturnValue({
        ...assistantConfigMock,
        files: ['file1', 'file2'],
      } as AssistantConfigParams);

      jest
        .spyOn(assistantService, 'updateFiles')
        .mockResolvedValue({} as Assistant);

      await assistantService.create();

      expect(assistantService.updateFiles).toHaveBeenCalled();
    });

    it('should save assistant ID', async () => {
      jest
        .spyOn(assistantService, 'updateFiles')
        .mockResolvedValue({ id: '1' } as Assistant);

      jest
        .spyOn(assistantMemoryService, 'saveAssistantId')
        .mockResolvedValue(undefined);

      await assistantService.create();

      expect(assistantMemoryService.saveAssistantId).toHaveBeenCalled();
    });
  });

  describe('updateFiles', () => {
    it('should update assistant files', async () => {
      assistantService.assistant = { id: '1' } as Assistant;
      jest
        .spyOn(aiService.provider.beta.assistants, 'update')
        .mockResolvedValue({ id: '2' } as Assistant);
      jest
        .spyOn(assistantFilesService, 'create')
        .mockResolvedValue(['file1', 'file2']);

      await assistantService.updateFiles();

      expect(assistantFilesService.create).toHaveBeenCalled();
      expect(aiService.provider.beta.assistants.update).toHaveBeenCalled();
    });
  });
});
