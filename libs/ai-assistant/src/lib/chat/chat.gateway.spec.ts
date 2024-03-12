import { Test } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { ChatGateway } from './chat.gateway';
import { AiModule } from './../ai/ai.module';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { ChatAudio } from './chat.model';

describe('ChatGateway', () => {
  let chatGateway: ChatGateway;
  let chatService: ChatService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AiModule, ChatModule],
    }).compile();

    chatGateway = moduleRef.get<ChatGateway>(ChatGateway);
    chatService = moduleRef.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatGateway).toBeDefined();
  });

  describe('listenForMessages', () => {
    it('should call chatService.call', async () => {
      jest.spyOn(chatService, 'call').mockReturnThis();
      const request = { threadId: '123', content: 'Hello' };

      await chatGateway.listenForMessages(request, {} as Socket);

      expect(chatService.call).toHaveBeenCalledWith(request);
    });
  });

  describe('listenForAudio', () => {
    it('should call chatService.transcription', async () => {
      jest.spyOn(chatService, 'transcription').mockReturnThis();
      const request = { threadId: '123' } as ChatAudio;

      await chatGateway.listenForAudio(request, {} as Socket);

      expect(chatService.transcription).toHaveBeenCalledWith(request);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
