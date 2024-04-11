import { Injectable } from '@nestjs/common';
import { AiService } from '../ai';
import { RunService } from '../run';
import {
  ChatCallCallbacks,
  ChatCallDto,
  ChatCallResponseDto,
} from './chat.model';
import { ChatHelpers } from './chat.helpers';
import { Message, MessageCreateParams } from 'openai/resources/beta/threads';
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
    await this.createMessage(payload);

    const runner = await this.getAssistantStream(payload);
    assistantStreamEventHandler<AssistantStream>(runner, callbacks);

    const finalRun = await runner.finalRun();
    await this.runService.resolve(await runner.finalRun(), true, callbacks);

    return {
      content: await this.chatbotHelpers.getAnswer(finalRun),
      threadId: payload.threadId,
    };
  }

  async createMessage(payload: ChatCallDto): Promise<Message> {
    const { threadId, content, file_ids, metadata } = payload;
    const message: MessageCreateParams = {
      role: 'user',
      content,
      file_ids,
      metadata,
    };

    return this.threads.messages.create(threadId, message);
  }

  async getAssistantStream(payload: ChatCallDto): Promise<AssistantStream> {
    const assistant_id =
      payload?.assistantId || process.env['ASSISTANT_ID'] || '';

    return this.threads.runs.createAndStream(payload.threadId, {
      assistant_id,
    });
  }
}
