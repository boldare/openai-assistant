import { Test } from '@nestjs/testing';
import { Assistant } from 'openai/resources/beta';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { ConfigModule } from '../config';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';

describe('AssistantController', () => {
  let assistantController: AssistantController;
  let assistantService: AssistantService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AssistantController],
      providers: [
        AssistantService,
        AssistantFilesService,
        AiService,
        AssistantMemoryService,
        AgentService,
      ],
    }).compile();

    assistantController =
      moduleRef.get<AssistantController>(AssistantController);
    assistantService = moduleRef.get<AssistantService>(AssistantService);
  });

  it('should be defined', () => {
    expect(assistantController).toBeDefined();
  });

  it('should call assistantService.updateFiles', async () => {
    jest
      .spyOn(assistantService, 'updateFiles')
      .mockReturnValue(Promise.resolve({} as Assistant));
    const files = { files: [] };

    await assistantController.updateAssistant(files);

    expect(assistantService.updateFiles).toHaveBeenCalledWith(files.files);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
