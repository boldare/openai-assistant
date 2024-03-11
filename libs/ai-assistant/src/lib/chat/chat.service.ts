import { Injectable } from '@nestjs/common';
import { MessageCreateParams } from 'openai/resources/beta/threads';
import { AiService } from '../ai';
import { RunService } from '../run';
import { ChatCallDto, ChatCallResponseDto } from './chat.model';
import { ChatHelpers } from './chat.helpers';

@Injectable()
export class ChatService {
  provider = this.aiService.provider;
  threads = this.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly runService: RunService,
    private readonly chatbotHelpers: ChatHelpers,
  ) {}

  async call(payload: ChatCallDto): Promise<ChatCallResponseDto> {
    const { threadId, content, file_ids, metadata } = payload;
    const message: MessageCreateParams = {
      role: 'user',
      content,
      file_ids,
      metadata,
    };

    await this.threads.messages.create(threadId, message);

    const run = await this.threads.runs.create(threadId, {
      assistant_id: process.env['ASSISTANT_ID'] || '',
    });

    await this.runService.resolve(run);

    return {
      content: await this.chatbotHelpers.getAnswer(run),
      threadId,
    };
  }
}
