import { Body, Controller, Post } from '@nestjs/common';
import { ChatCall } from './chat.model';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(public readonly chatService: ChatService) {}

  @Post()
  async call(@Body() payload: ChatCall): Promise<string> {
    return this.chatService.call(payload);
  }
}
