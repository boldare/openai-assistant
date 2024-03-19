import { ChatGateway, ChatService } from '@boldare/openai-assistant';
import { WebSocketGateway } from '@nestjs/websockets';
import { cors } from '../cors.config';

@WebSocketGateway({ cors })
export class ChatSockets extends ChatGateway {
  constructor(override readonly chatsService: ChatService) {
    super(chatsService);
  }
}
