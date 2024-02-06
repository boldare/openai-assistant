import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { GetThreadParams, ThreadConfig } from './threads.model';
import { ThreadsService } from './threads.service';

@Controller('assistant/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get(':id')
  async getThread(@Param() params: GetThreadParams): Promise<Thread> {
    return await this.threadsService.getThread(params.id);
  }

  @Post('')
  async createThread(@Body() payload: ThreadConfig): Promise<Thread> {
    return await this.threadsService.createThread(payload);
  }
}
