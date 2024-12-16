import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { createChatController } from './chat.controller';
import { ChatCallDto, ChatCallResponseDto } from './chat.model';

describe('ChatController', () => {
  let chatController: any;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: 'PREFIX',
          useValue: 'test-prefix',
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    const ChatController = createChatController('test-prefix');
    chatController = new ChatController(chatService);
  });

  it('should be defined', () => {
    expect(chatController).toBeDefined();
  });

  describe('call', () => {
    it('should call chatService.call', async () => {
      jest
        .spyOn(chatService, 'call')
        .mockResolvedValue({} as ChatCallResponseDto);
      const payload = {
        threadId: '123',
        content: [
          {
            text: { value: 'Hello', annotations: [] },
            type: 'text',
          },
        ],
      } as ChatCallDto;

      await chatController.call(payload);

      expect(chatService.call).toHaveBeenCalledWith(payload);
    });
  });
});

// import { Test } from '@nestjs/testing';
// import { createChatController } from './chat.controller';
// import { AiModule } from './../ai/ai.module';
// import { ChatModule } from './chat.module';
// import { ChatService } from './chat.service';
// import { ChatCallDto, ChatCallResponseDto } from './chat.model';

// describe('ChatController', () => {
//   const chatController = createChatController('test');
//   let chatService: ChatService;

//   // beforeEach(async () => {
//   //   const moduleRef = await Test.createTestingModule({
//   //     imports: [AiModule, ChatModule],
//   //     controllers: [ChatController],
//   //   }).compile();

//   //   chatController = moduleRef.get<ChatController>(ChatController);
//   //   chatService = moduleRef.get<ChatService>(ChatService);
//   // });

//   it('should be defined', () => {
//     expect(chatController).toBeDefined();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
// });
