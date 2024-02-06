import { Injectable } from '@nestjs/common';
import { MessageCreateParams } from 'openai/resources/beta/threads';
import { AiService } from '../ai';
import { RunService } from '../run';
import { ChatAudio, ChatCall, ChatCallResponse } from './chat.model';
import { ChatHelpers } from './chat.helpers';

@Injectable()
export class ChatService {
  private readonly provider = this.aiService.provider;
  private readonly threads = this.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly runService: RunService,
    private readonly chatbotHelpers: ChatHelpers,
  ) {}

  async call(payload: ChatCall): Promise<ChatCallResponse> {
    const { threadId, content, file_ids } = payload;
    const message: MessageCreateParams = {
      role: 'user',
      content,
      file_ids,
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

  async transcription(payload: ChatAudio): Promise<ChatCall> {
    const transcription = await this.aiService.transcription(payload.file);
    return await this.call({
      threadId: payload.threadId,
      content: transcription.text,
    });
  }
}
