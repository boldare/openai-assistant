import { Injectable } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { AiService } from '../ai';
import { CreateThreadDto, GetThreadResponseDto } from './threads.model';

@Injectable()
export class ThreadsService {
  constructor(private readonly aiService: AiService) {}

  async getThread(id: string): Promise<GetThreadResponseDto> {
    const messages = await this.aiService.provider.beta.threads.messages.list(
      id,
    );
    return {
      id,
      messages: messages?.data || [],
    };
  }

  async createThread({ messages }: CreateThreadDto = {}): Promise<Thread> {
    return this.aiService.provider.beta.threads.create({ messages });
  }
}
