import { Test } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { ChatGateway } from './chat.gateway';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { ChatCallDto } from './chat.model';

describe('ChatGateway', () => {
  let chatGateway: ChatGateway;
  let chatService: ChatService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ChatModule],
      providers: [ChatGateway],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
    chatGateway = new ChatGateway(chatService);

    jest.spyOn(chatService, 'call').mockResolvedValue({
      threadId: '123',
      content: [
        {
          text: { value: 'Hello', annotations: [] },
          type: 'text',
        },
      ],
    });
  });

  it('should be defined', () => {
    expect(chatGateway).toBeDefined();
  });

  describe('listenForMessages', () => {
    it('should call chatService.call', async () => {
      const request = {
        threadId: '123',
        content: [
          {
            text: { value: 'Hello', annotations: [] },
            type: 'text',
          },
        ],
      } as ChatCallDto;

      await chatGateway.listenForMessages(request, {} as Socket);

      expect(chatService.call).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
