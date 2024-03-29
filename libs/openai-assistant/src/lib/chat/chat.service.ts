import { Injectable } from '@nestjs/common';
import { AiService } from '../ai';
import { RunService } from '../run';
import {
  ChatCallCallbacks,
  ChatCallDto,
  ChatCallResponseDto,
} from './chat.model';
import { ChatHelpers } from './chat.helpers';
import { MessageCreateParams, Run } from 'openai/resources/beta/threads';
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

    const runner = await this.assistantStream(payload, callbacks);
    const finalRun = await runner.finalRun();

    return {
      content: await this.chatbotHelpers.getAnswer(finalRun),
      threadId,
    };
  }

  async assistantStream(
    payload: ChatCallDto,
    callbacks?: ChatCallCallbacks,
  ): Promise<AssistantStream> {
    const assistant_id =
      payload?.assistantId || process.env['ASSISTANT_ID'] || '';

    const runner = this.threads.runs
      .createAndStream(payload.threadId, { assistant_id })
      .on('event', event => {
        if (event.event === 'thread.run.requires_action') {
          this.runService.submitAction(event.data, callbacks);
        }
      });

    return assistantStreamEventHandler<AssistantStream>(runner, callbacks);
  }
}
