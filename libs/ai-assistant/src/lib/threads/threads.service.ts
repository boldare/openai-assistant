import { Injectable } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { AiService } from '../ai';
import { ThreadConfig } from './threads.model';

@Injectable()
export class ThreadsService {
  constructor(private readonly aiService: AiService) {}

  async getThread(id: string): Promise<Thread> {
    return this.aiService.provider.beta.threads.retrieve(id);
  }

  async createThread({ messages }: ThreadConfig = {}): Promise<Thread> {
    return this.aiService.provider.beta.threads.create({ messages });
  }
}
