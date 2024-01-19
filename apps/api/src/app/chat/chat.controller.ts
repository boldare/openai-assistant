import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Assistant, Thread } from 'openai/resources/beta';
import { ChatCall, GetThreadParams, ThreadConfig } from './chat.model';
import { ChatService } from './chat.service';
import { AssistantFiles, AssistantService } from '@boldare/assistant-ai';

@Controller('chat')
export class ChatController {
  constructor(
    public readonly chatService: ChatService,
    public readonly assistantService: AssistantService,
  ) {}

  @Get('thread/:id')
  async getThread(@Param() params: GetThreadParams): Promise<Thread> {
    return await this.chatService.getThread(params.id);
  }

  @Post('thread')
  async createThread(@Body() payload: ThreadConfig): Promise<Thread> {
    return await this.chatService.createThread(payload);
  }

  @Post()
  async call(@Body() payload: ChatCall): Promise<ChatCall> {
    return await this.chatService.call(payload);
  }

  @Post('/files')
  async updateFiles(@Body() { files }: AssistantFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(files);
  }
}
