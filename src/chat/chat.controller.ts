import { Body, Controller, Post } from '@nestjs/common';
import { Assistant } from 'openai/resources/beta';
import { ChatCall, ChatUpdateFiles } from './chat.model';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(public readonly chatService: ChatService) {}

  @Post()
  async call(@Body() payload: ChatCall): Promise<string> {
    return this.chatService.call(payload);
  }

  @Post('/files')
  async updateFiles(@Body() payload: ChatUpdateFiles): Promise<Assistant> {
    return this.chatService.updateFiles(payload);
  }
}
