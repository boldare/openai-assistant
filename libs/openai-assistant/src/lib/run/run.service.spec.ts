import { Test } from '@nestjs/testing';
import { Run } from 'openai/resources/beta/threads';
import { RunService } from './run.service';
import { RunModule } from './run.module';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantStream } from 'openai/lib/AssistantStream';

jest.mock('../stream/stream.utils', () => ({
  assistantStreamEventHandler: jest.fn(),
}));

describe('RunService', () => {
  let runService: RunService;
  let aiService: AiService;
  let agentsService: AgentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RunModule],
    }).compile();

    runService = moduleRef.get<RunService>(RunService);
    aiService = moduleRef.get<AiService>(AiService);
    agentsService = moduleRef.get<AgentService>(AgentService);

    jest
      .spyOn(aiService.provider.beta.threads.runs, 'retrieve')
      .mockReturnThis();
  });

  it('should be defined', () => {
    expect(runService).toBeDefined();
  });

  describe('submitAction', () => {
    it('should call submitToolOutputsStream', async () => {
      const spyOnSubmitToolOutputsStream = jest
        .spyOn(aiService.provider.beta.threads.runs, 'submitToolOutputsStream')
        .mockReturnValue({} as AssistantStream);
      jest.spyOn(agentsService, 'get').mockReturnValue(jest.fn());

      const run = {
        thread_id: '1',
        id: '123',
        required_action: {
          type: 'submit_tool_outputs',
          submit_tool_outputs: {
            tool_calls: [{ function: { name: 'agent' } }],
          },
        },
      } as Run;

      await runService.submitAction(run);

      expect(spyOnSubmitToolOutputsStream).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
