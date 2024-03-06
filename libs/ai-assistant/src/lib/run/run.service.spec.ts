import { Test } from '@nestjs/testing';
import { Run } from 'openai/resources/beta/threads';
import { RunService } from './run.service';
import { RunModule } from './run.module';
import { AiService } from '../ai';

describe('RunService', () => {
  let runService: RunService;
  let aiService: AiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RunModule],
    }).compile();

    runService = moduleRef.get<RunService>(RunService);
    aiService = moduleRef.get<AiService>(AiService);

    jest
      .spyOn(aiService.provider.beta.threads.runs, 'retrieve')
      .mockReturnThis();
  });

  it('should be defined', () => {
    expect(runService).toBeDefined();
  });

  describe('continueRun', () => {
    it('should call threads.runs.retrieve', async () => {
      const spyOnRetrieve = jest
        .spyOn(aiService.provider.beta.threads.runs, 'retrieve')
        .mockReturnThis();
      const run = { thread_id: '1', id: '123' } as Run;

      await runService.continueRun(run);

      expect(spyOnRetrieve).toHaveBeenCalled();
    });

    it('should wait for timeout', async () => {
      const run = { thread_id: '1', id: '123' } as Run;
      const spyOnTimeout = jest.spyOn(global, 'setTimeout');

      await runService.continueRun(run);

      expect(spyOnTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        runService.timeout,
      );
    });
  });

  describe('resolve', () => {
    it('should call continueRun', async () => {
      const spyOnContinueRun = jest
        .spyOn(runService, 'continueRun')
        .mockResolvedValue({} as Run);
      const run = { status: 'requires_action' } as Run;

      await runService.resolve(run, false);

      expect(spyOnContinueRun).toHaveBeenCalled();
    });

    it('should call submitAction', async () => {
      const spyOnSubmitAction = jest
        .spyOn(runService, 'submitAction')
        .mockResolvedValue();
      const run = {
        status: 'requires_action',
        required_action: { type: 'submit_tool_outputs' },
      } as Run;

      await runService.resolve(run, false);

      expect(spyOnSubmitAction).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    runService.isRunning = true;
  });
});
