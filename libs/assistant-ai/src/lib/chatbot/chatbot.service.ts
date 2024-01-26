import { Injectable } from '@nestjs/common';
import {
  MessageContentText,
  MessageCreateParams,
  Run,
  ThreadMessage,
} from 'openai/resources/beta/threads';
import { AiService } from '../ai';
import { RunService } from '../run';
import { AssistantService, ChatCall } from '../assistant';

@Injectable()
export class ChatbotService {
  private readonly provider = this.aiService.provider;
  private readonly threads = this.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly assistantService: AssistantService,
    private readonly runService: RunService,
  ) {}

  async call(payload: ChatCall): Promise<string> {
    const { threadId, content, file_ids } = payload;
    const message: MessageCreateParams = {
      role: 'user',
      content,
      file_ids,
    };

    await this.threads.messages.create(threadId, message);

    const run = await this.threads.runs.create(threadId, {
      assistant_id: this.assistantService.assistant.id,
    });

    await this.runService.resolve(run);

    return this.getAnswer(run);
  }

  async getAnswer(run: Run): Promise<string> {
    const lastThreadMessage = await this.getLastMessage(run);
    return this.parseThreadMessage(lastThreadMessage);
  }

  parseThreadMessage(message?: ThreadMessage): string {
    if (!message) {
      return `Seems I'm lost, would you mind reformulating your question`;
    }

    const content = message.content[0] as MessageContentText;
    return content.text.value;
  }

  async getLastMessage(
    run: Run,
    role = 'assistant',
  ): Promise<ThreadMessage | undefined> {
    const messages = await this.threads.messages.list(run.thread_id);
    return (
      messages.data
        .filter(message => message.run_id === run.id && message.role === role)
        .pop() || undefined
    );
  }
}
