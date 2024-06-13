import { Injectable } from '@nestjs/common';
import { Message, MessageContent, Run } from 'openai/resources/beta/threads';
import { AiService } from '../ai';

@Injectable()
export class ChatHelpers {
  private readonly provider = this.aiService.provider;
  private readonly threads = this.provider.beta.threads;

  constructor(private readonly aiService: AiService) {}

  async getAnswer(run: Run): Promise<MessageContent[]> {
    const lastThreadMessage = await this.geRunMessage(run);
    return this.parseThreadMessage(lastThreadMessage);
  }

  parseThreadMessage(message?: Message): MessageContent[] {
    if (!message) {
      throw `Seems I'm lost, would you mind reformulating your question`;
    }

    return message.content;
  }

  async geRunMessage(
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
