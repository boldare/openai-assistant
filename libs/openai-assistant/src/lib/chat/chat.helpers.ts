import { Injectable } from '@nestjs/common';
import {
  Message,
  Run, TextContentBlock,
} from 'openai/resources/beta/threads';
import { AiService } from '../ai';

@Injectable()
export class ChatHelpers {
  private readonly provider = this.aiService.provider;
  private readonly threads = this.provider.beta.threads;

  constructor(private readonly aiService: AiService) {}

  async getAnswer(run: Run): Promise<string> {
    const lastThreadMessage = await this.getLastMessage(run);
    return this.parseThreadMessage(lastThreadMessage);
  }

  parseThreadMessage(message?: Message): string {
    if (!message) {
      return `Seems I'm lost, would you mind reformulating your question`;
    }

    const content = message.content[0] as TextContentBlock;
    return content.text.value;
  }

  async getLastMessage(
    run: Run,
    role = 'assistant',
  ): Promise<Message | undefined> {
    const messages = await this.threads.messages.list(run.thread_id);
    return (
      messages.data
        .filter(message => message.run_id === run.id && message.role === role)
        .pop() || undefined
    );
  }
}
