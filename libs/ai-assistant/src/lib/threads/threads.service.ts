import { Injectable } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { AiService } from '../ai';
import { ThreadConfig, ThreadResponse } from './threads.model';

@Injectable()
export class ThreadsService {
  constructor(private readonly aiService: AiService) {}

  async getThread(id: string): Promise<ThreadResponse> {
    const messages = await this.aiService.provider.beta.threads.messages.list(
      id,
    );
    return {
      id,
      messages: messages.data || [],
    };
  }

  async createThread({ messages }: ThreadConfig = {}): Promise<Thread> {
    return this.aiService.provider.beta.threads.create({ messages });
  }
}
