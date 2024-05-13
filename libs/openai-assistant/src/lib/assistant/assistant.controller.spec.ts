import { Test } from '@nestjs/testing';
import { Assistant } from 'openai/resources/beta';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { ConfigModule } from '../config';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { AssistantToolResources } from './assistant.model';

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
    const toolResources: AssistantToolResources = {
      codeInterpreter: { fileNames: ['file1'] },
      fileSearch: { boldare: ['file1'] },
    };

    await assistantController.updateAssistant({ toolResources });

    expect(assistantService.updateFiles).toHaveBeenCalledWith(toolResources);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
