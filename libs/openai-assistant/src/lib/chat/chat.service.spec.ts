import { Test } from '@nestjs/testing';
import { APIPromise } from 'openai/core';
import { Message, MessageContent, Run } from 'openai/resources/beta/threads';
import { AssistantStream } from 'openai/lib/AssistantStream';
import { AiModule } from './../ai/ai.module';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { ChatHelpers } from './chat.helpers';
import { ChatCallDto } from './chat.model';
import { RunService } from '../run/run.service';

jest.mock('../stream/stream.utils', () => ({
  assistantStreamEventHandler: jest.fn(),
}));

describe('ChatService', () => {
  let chatService: ChatService;
  let chatbotHelpers: ChatHelpers;
  let runService: RunService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AiModule, ChatModule],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
    chatbotHelpers = moduleRef.get<ChatHelpers>(ChatHelpers);
    runService = moduleRef.get<RunService>(RunService);

    jest.spyOn(runService, 'resolve').mockReturnThis();

    jest.spyOn(chatbotHelpers, 'getAnswer').mockReturnValue(
      Promise.resolve([
        {
          type: 'text',
          text: {
            value: 'Hello response',
            annotations: [],
          },
        },
      ]) as Promise<MessageContent[]>,
    );

    jest
      .spyOn(chatService.threads.messages, 'create')
      .mockReturnValue({} as APIPromise<Message>);

    jest.spyOn(chatService, 'getAssistantStream').mockReturnValue({
      finalRun: jest.fn(),
      on: () => jest.fn(),
    } as unknown as Promise<AssistantStream>);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  describe('call', () => {
    it('should create "thread run"', async () => {
      const payload = {
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello',
              annotations: [],
            },
          },
        ],
        threadId: '1',
      } as ChatCallDto;
      const spyOnThreadRunsCreate = jest
        .spyOn(chatService.threads.messages, 'create')
        .mockResolvedValue({} as Message);

      await chatService.call(payload);

      expect(spyOnThreadRunsCreate).toHaveBeenCalled();
    });

    it('should return ChatCallResponse', async () => {
      const payload = {
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello response',
              annotations: [],
            },
          },
        ],
        threadId: '1',
      } as ChatCallDto;
      jest
        .spyOn(chatService.threads.runs, 'create')
        .mockResolvedValue({} as Run);

      const result = await chatService.call(payload);

      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello response',
              annotations: [],
            },
          },
        ],
        threadId: '1',
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
