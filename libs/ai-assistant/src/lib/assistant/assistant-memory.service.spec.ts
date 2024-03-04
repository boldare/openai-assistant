import * as fs from 'fs';
import * as envfile from 'envfile';
import { AssistantMemoryService } from './assistant-memory.service';

describe('AssistantMemoryService', () => {
  let assistantMemoryService: AssistantMemoryService;

  beforeEach(() => {
    assistantMemoryService = new AssistantMemoryService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AssistantMemoryService).toBeDefined();
  });

  describe('saveAssistantId', () => {
    it('should save assistant id', async () => {
      const sourcePath = './.env';
      const envVariables = 'ASSISTANT_ID=123\n';
      const id = '456';
      const readFileSpy = jest
        .spyOn(fs.promises, 'readFile')
        .mockResolvedValue(envVariables);
      const writeFileSpy = jest
        .spyOn(fs.promises, 'writeFile')
        .mockResolvedValue();
      const parseSpy = jest
        .spyOn(envfile, 'parse')
        .mockReturnValue({ ASSISTANT_ID: '123' });
      const stringifySpy = jest
        .spyOn(envfile, 'stringify')
        .mockReturnValue('ASSISTANT_ID=456\n');

      await assistantMemoryService.saveAssistantId(id);

      expect(readFileSpy).toHaveBeenCalledWith(sourcePath);
      expect(parseSpy).toHaveBeenCalledWith(envVariables);
      expect(stringifySpy).toHaveBeenCalledWith({ ASSISTANT_ID: id });
      expect(writeFileSpy).toHaveBeenCalledWith(
        sourcePath,
        'ASSISTANT_ID=456\n',
      );
    });

    it('should log error', async () => {
      const error = new Error('error');
      const sourcePath = './.env';
      const readFileSpy = jest
        .spyOn(fs.promises, 'readFile')
        .mockRejectedValue(error);
      const loggerSpy = jest.spyOn(assistantMemoryService['logger'], 'error');

      await assistantMemoryService.saveAssistantId('456');

      expect(readFileSpy).toHaveBeenCalledWith(sourcePath);
      expect(loggerSpy).toHaveBeenCalledWith(`Can't save variable: ${error}`);
    });
  });
});
