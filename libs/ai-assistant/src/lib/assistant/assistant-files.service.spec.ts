import { ConfigService } from '../config';
import { AiService } from '../ai';
import { AssistantFilesService } from './assistant-files.service';
import OpenAI from 'openai';

jest.mock('fs', () => ({
  createReadStream: jest.fn().mockReturnValue('file'),
}));

describe('AssistantFilesService', () => {
  let aiService: AiService;
  let configService: ConfigService;
  let assistantFilesService: AssistantFilesService;

  beforeEach(() => {
    aiService = new AiService();
    configService = new ConfigService();
    assistantFilesService = new AssistantFilesService(configService, aiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(assistantFilesService).toBeDefined();
  });

  it('should create files', async () => {
    const fileNames = ['file1', 'file2'];
    const create = jest.fn().mockResolvedValue({ id: 'id' });
    aiService.provider = { files: { create } } as unknown as OpenAI;
    configService.get = jest.fn().mockReturnValue({ filesDir: 'dir' });

    const result = await assistantFilesService.create(fileNames);

    expect(result).toEqual(['id', 'id']);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create).toHaveBeenCalledWith({
      file: 'file',
      purpose: 'assistants',
    });
  });
});
