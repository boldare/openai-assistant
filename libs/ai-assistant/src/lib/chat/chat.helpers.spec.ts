import { Test } from '@nestjs/testing';
import { ChatModule } from './chat.module';
import { ChatHelpers } from './chat.helpers';
import { Run, ThreadMessage } from 'openai/resources/beta/threads';

describe('ChatService', () => {
  let chatbotHelpers: ChatHelpers;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ChatModule],
    }).compile();

    chatbotHelpers = moduleRef.get<ChatHelpers>(ChatHelpers);
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

  afterEach(() => {
    jest.clearAllMocks();
  });
});
