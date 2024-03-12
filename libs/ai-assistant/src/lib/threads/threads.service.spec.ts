import { Test } from '@nestjs/testing';
import { Thread } from 'openai/resources/beta';
import { ThreadMessagesPage } from 'openai/resources/beta/threads';
import { APIPromise } from 'openai/core';
import { ThreadsService } from './threads.service';
import { ThreadsModule } from './threads.module';
import { AiService } from '../ai';

describe('ThreadsService', () => {
  let threadsService: ThreadsService;
  let aiService: AiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ThreadsModule],
    }).compile();

    threadsService = moduleRef.get<ThreadsService>(ThreadsService);
    aiService = moduleRef.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(threadsService).toBeDefined();
  });

  describe('getThread', () => {
    it('should return ThreadResponse object', async () => {
      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockResolvedValue({
          data: [{ id: 'thread-1' }],
        } as unknown as ThreadMessagesPage);

      const result = await threadsService.getThread('1');

      expect(result).toEqual({ id: '1', messages: [{ id: 'thread-1' }] });
    });

    it('should return ThreadResponse with empty list of messages when data is undefined', async () => {
      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockResolvedValue({} as unknown as ThreadMessagesPage);

      const result = await threadsService.getThread('1');

      expect(result).toEqual({ id: '1', messages: [] });
    });
  });

  describe('createThread', () => {
    it('should call threadsService.createThread', async () => {
      const spyOnCreateThread = jest
        .spyOn(aiService.provider.beta.threads, 'create')
        .mockReturnValue({} as APIPromise<Thread>);

      await threadsService.createThread({});

      expect(spyOnCreateThread).toHaveBeenCalled();
    });

    it('should call threadsService.createThread when params are not defined', async () => {
      const spyOnCreateThread = jest
        .spyOn(aiService.provider.beta.threads, 'create')
        .mockReturnValue({} as APIPromise<Thread>);

      await threadsService.createThread();

      expect(spyOnCreateThread).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
