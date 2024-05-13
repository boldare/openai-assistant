import OpenAI from 'openai';
import { ConfigService } from '../config';
import { AiService } from '../ai';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantToolResources } from './assistant.model';

jest.mock('fs', () => ({
  createReadStream: jest.fn().mockReturnValue('file'),
}));

describe('AssistantFilesService', () => {
  let aiService: AiService;
  let configService: ConfigService;
  let assistantFilesService: AssistantFilesService;
  const create = jest.fn().mockResolvedValue({ id: 'id' });
  const fileNames = ['file1', 'file2'];
  const toolResources: AssistantToolResources = {
    codeInterpreter: { fileNames },
    fileSearch: { boldare: fileNames },
  };

  beforeEach(() => {
    aiService = new AiService();
    configService = new ConfigService();
    assistantFilesService = new AssistantFilesService(configService, aiService);
    aiService.provider = {
      files: { create },
      beta: {
        vectorStores: {
          create,
          fileBatches: {
            uploadAndPoll: jest.fn().mockResolvedValue({ id: 'id' }),
          },
        },
      },
    } as unknown as OpenAI;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(assistantFilesService).toBeDefined();
  });

  it('should create files', async () => {
    configService.get = jest.fn().mockReturnValue({ filesDir: 'dir' });

    const result = await assistantFilesService.create(toolResources);

    expect(result).toEqual({
      code_interpreter: { file_ids: ['id', 'id'] },
      file_search: { vector_store_ids: ['id'] },
    });
    expect(create).toHaveBeenCalledWith({
      file: 'file',
      purpose: 'assistants',
    });
  });

  it('should create files without file directory', async () => {
    configService.get = jest.fn().mockReturnValue({});

    const result = await assistantFilesService.create(toolResources);

    expect(result).toEqual({
      code_interpreter: { file_ids: ['id', 'id'] },
      file_search: { vector_store_ids: ['id'] },
    });
  });
});
