import { Test } from '@nestjs/testing';
import { APIPromise } from 'openai/core';
import { Run, ThreadMessage } from 'openai/resources/beta/threads';
import { AiModule } from './../ai/ai.module';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { ChatAudio, ChatCall } from './chat.model';
import { ChatHelpers } from './chat.helpers';
import { RunService } from '../run';
import { AiService } from '../ai';

describe('ChatService', () => {
  let chatService: ChatService;
  let chatbotHelpers: ChatHelpers;
  let runService: RunService;
  let aiService: AiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AiModule, ChatModule],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
    chatbotHelpers = moduleRef.get<ChatHelpers>(ChatHelpers);
    runService = moduleRef.get<RunService>(RunService);
    aiService = moduleRef.get<AiService>(AiService);

    jest
      .spyOn(chatbotHelpers, 'getAnswer')
      .mockReturnValue(Promise.resolve('Hello response') as Promise<string>);

    jest.spyOn(runService, 'resolve').mockReturnThis();

    jest
      .spyOn(chatService.threads.messages, 'create')
      .mockReturnValue({} as APIPromise<ThreadMessage>);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  describe('call', () => {
    it('should create "thread run"', async () => {
      const payload = { content: 'Hello', threadId: '1' } as ChatCall;
      const spyOnThreadRunsCreate = jest
        .spyOn(chatService.threads.runs, 'create')
        .mockResolvedValue({} as Run);

      await chatService.call(payload);

      expect(spyOnThreadRunsCreate).toHaveBeenCalled();
    });

    it('should return ChatCallResponse', async () => {
      const payload = { content: 'Hello', threadId: '1' } as ChatCall;
      jest
        .spyOn(chatService.threads.runs, 'create')
        .mockResolvedValue({} as Run);

      const result = await chatService.call(payload);

      expect(result).toEqual({ content: 'Hello response', threadId: '1' });
    });
  });

  describe('transcription', () => {
    it('should trigger call and transcription', async () => {
      const payload = { file: 'file', threadId: '1' } as unknown as ChatAudio;
      const spyOnTranscription = jest
        .spyOn(aiService, 'transcription')
        .mockResolvedValue({ text: 'Hello' });
      const spyOnCall = jest.spyOn(chatService, 'call').mockReturnThis();

      await chatService.transcription(payload);

      expect(spyOnTranscription).toHaveBeenCalledWith(payload.file);
      expect(spyOnCall).toHaveBeenCalledWith({
        threadId: payload.threadId,
        content: 'Hello',
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
