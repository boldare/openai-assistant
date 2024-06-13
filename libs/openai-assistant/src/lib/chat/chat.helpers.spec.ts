import { Test } from '@nestjs/testing';
import { Message, MessagesPage, Run } from 'openai/resources/beta/threads';
import { PagePromise } from 'openai/core';
import { ChatModule } from './chat.module';
import { ChatHelpers } from './chat.helpers';
import { AiService } from '../ai';
import { error } from 'console';

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
    it('should return array of MessageContent', async () => {
      const threadMessage: Message = {
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
      } as unknown as Message;

      jest
        .spyOn(chatbotHelpers, 'geRunMessage')
        .mockReturnValue(Promise.resolve(threadMessage));

      const result = await chatbotHelpers.getAnswer({} as Run);

      expect(result).toBe(threadMessage.content);
    });
  });

  describe('parseThreadMessage', () => {
    it('should return a array of MessageContent', () => {
      const threadMessage: Message = {
        content: [
          {
            type: 'text',
            text: {
              value: 'Hello',
              annotations: [],
            },
          },
        ],
      } as unknown as Message;

      const result = chatbotHelpers.parseThreadMessage(threadMessage);

      expect(result).toBe(threadMessage.content);
    });
  });

  describe('geRunMessage', () => {
    it('should return a ThreadMessage', async () => {
      const threadMessagesPage = {
        data: [
          { run_id: '1', role: 'assistant', id: '1' },
          { run_id: '2', role: 'user', id: '2' },
          { run_id: '1', role: 'assistant', id: '3' },
        ],
      } as unknown as MessagesPage;

      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockReturnValue(
          threadMessagesPage as unknown as PagePromise<MessagesPage, Message>,
        );

      const result = await chatbotHelpers.geRunMessage({ id: '1' } as Run);

      expect(result).toBe(threadMessagesPage.data[2]);
    });

    it('should return undefined', async () => {
      const threadMessagesPage = {
        data: [
          { run_id: '1', role: 'user', id: '2' },
          { run_id: '1', role: 'user', id: '3' },
        ],
      } as unknown as MessagesPage;

      jest
        .spyOn(aiService.provider.beta.threads.messages, 'list')
        .mockReturnValue(
          threadMessagesPage as unknown as PagePromise<MessagesPage, Message>,
        );

      const result = await chatbotHelpers.geRunMessage({ id: '1' } as Run);

      expect(result).toBe(undefined);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
