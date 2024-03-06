import { Test } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { AiModule } from './../ai/ai.module';
import { ChatModule } from './chat.module';
import { ChatService } from './chat.service';
import { ChatCall, ChatCallResponse } from './chat.model';
describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AiModule, ChatModule],
      controllers: [ChatController],
    }).compile();

    chatController = moduleRef.get<ChatController>(ChatController);
    chatService = moduleRef.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatController).toBeDefined();
  });

  describe('call', () => {
    it('should call chatService.call', async () => {
      jest.spyOn(chatService, 'call').mockResolvedValue({} as ChatCallResponse);
      const payload = { content: 'Hello' } as ChatCall;

      await chatController.call(payload);

      expect(chatService.call).toHaveBeenCalledWith(payload);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
