import { Injectable } from '@nestjs/common';
import { AiService } from '../ai';
import { RunService } from '../run';
import {
  ChatCallCallbacks,
  ChatCallDto,
  ChatCallResponseDto,
} from './chat.model';
import { ChatHelpers } from './chat.helpers';
import { MessageCreateParams } from 'openai/resources/beta/threads';
import { AssistantStream } from 'openai/lib/AssistantStream';
import { assistantStreamEventHandler } from '../stream/stream.utils';

@Injectable()
export class ChatService {
  provider = this.aiService.provider;
  threads = this.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly runService: RunService,
    private readonly chatbotHelpers: ChatHelpers,
  ) {}

  async call(
    payload: ChatCallDto,
    callbacks?: ChatCallCallbacks,
  ): Promise<ChatCallResponseDto> {
    const { threadId, content, file_ids, metadata } = payload;
    const message: MessageCreateParams = {
      role: 'user',
      content,
      file_ids,
      metadata,
    };

    await this.threads.messages.create(threadId, message);

    const run = this.assistantStream(threadId, callbacks);
    const finalRun = await run.finalRun();

    await this.runService.resolve(finalRun, true, callbacks);

    return {
      content: await this.chatbotHelpers.getAnswer(finalRun),
      threadId,
    };
  }

  assistantStream(
    threadId: string,
    callbacks?: ChatCallCallbacks,
  ): AssistantStream {
    const runner = this.threads.runs.createAndStream(threadId, {
      assistant_id: process.env['ASSISTANT_ID'] || '',
    });

    return assistantStreamEventHandler<AssistantStream>(runner, callbacks);
  }
}
