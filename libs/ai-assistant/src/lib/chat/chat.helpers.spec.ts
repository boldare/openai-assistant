import { Test } from '@nestjs/testing';
import {
  Run,
  ThreadMessage,
  ThreadMessagesPage,
} from 'openai/resources/beta/threads';
import { PagePromise } from 'openai/core';
import { ChatModule } from './chat.module';
import { ChatHelpers } from './chat.helpers';
import { AiService } from '../ai';

describe('ChatService', () => {
  let chatbotHelpers: ChatHelpers;
  let aiService: AiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ChatModule],
    }).compile();

    chatbotHelpers = moduleRef.get<ChatHelpers>(ChatHelpers);
    aiService = moduleRef.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(chatbotHelpers).toBeDefined();
  });

  describe('getAnswer', () => {
    it('should return a string', async () => {
      const threadMessage: ThreadMessage = {
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello',
              annotations: [],
            },
          },
          {
            type: 'text',
            text: {
              value: 'Hello 2',
              annotations: [],
            },
          },
        ],
      } as unknown as ThreadMessage;

      jest
        .spyOn(chatbotHelpers, 'getLastMessage')
        .mockReturnValue(Promise.resolve(threadMessage));

      const result = await chatbotHelpers.getAnswer({} as Run);

      expect(result).toBe('Hello');
    });
  });

  describe('parseThreadMessage', () => {
    it('should return a string', () => {
      const threadMessage: ThreadMessage = {
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello',
              annotations: [],
            },
          },
          {
            type: 'text',
            text: {
              value: 'Hello 2',
              annotations: [],
            },
          },
        ],
      } as unknown as ThreadMessage;

      const result = chatbotHelpers.parseThreadMessage(threadMessage);

      expect(result).toBe('Hello');
    });

    it('should return a default message', () => {
      const result = chatbotHelpers.parseThreadMessage();

      expect(result).toBe(
        `Seems I'm lost, would you mind reformulating your question`,
      );
    });
  });

  describe('getLastMessage', () => {
    it('should return a ThreadMessage', async () => {
      const threadMessagesPage = {
        data: [
          { run_id: '1', role: 'assistant', id: '1' },
          { run_id: '1', role: 'user', id: '2' },
          { run_id: '1', role: 'assistant', id: '3' },
        ],
      } as unknown as ThreadMessagesPage;

      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockReturnValue(
          threadMessagesPage as unknown as PagePromise<
            ThreadMessagesPage,
            ThreadMessage
          >,
        );

      const result = await chatbotHelpers.getLastMessage({ id: '1' } as Run);

      expect(result).toBe(threadMessagesPage.data[2]);
    });

    it('should return undefined', async () => {
      const threadMessagesPage = {
        data: [
          { run_id: '1', role: 'user', id: '2' },
          { run_id: '1', role: 'user', id: '3' },
        ],
      } as unknown as ThreadMessagesPage;

      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockReturnValue(
          threadMessagesPage as unknown as PagePromise<
            ThreadMessagesPage,
            ThreadMessage
          >,
        );

      const result = await chatbotHelpers.getLastMessage({ id: '1' } as Run);

      expect(result).toBe(undefined);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
