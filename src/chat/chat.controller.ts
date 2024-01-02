import { Body, Controller, Post } from '@nestjs/common';
import { ChatCall } from './chat.model';
import { ChatService } from './chat.service';
import { AssistantFiles } from '../assistant/assistant.model';
import { Assistant } from 'openai/resources/beta';
import { AssistantService } from '../assistant/assistant.service';

@Controller('chat')
export class ChatController {
  constructor(
    public readonly chatService: ChatService,
    public readonly assistantService: AssistantService,
  ) {}

  @Post()
  async call(@Body() payload: ChatCall): Promise<string> {
    return this.chatService.call(payload);
  }

  @Post('/files')
  async updateFiles(@Body() { files }: AssistantFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(files);
  }
}
