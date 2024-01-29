import { Body, Controller, Post } from '@nestjs/common';
import { ChatCall, ChatCallResponse } from './chat.model';
import { ChatService } from './chat.service';

@Controller('assistant/chat')
export class ChatController {
  constructor(public readonly chatsService: ChatService) {}

  @Post()
  async call(@Body() payload: ChatCall): Promise<ChatCallResponse> {
    return await this.chatsService.call(payload);
  }
}
