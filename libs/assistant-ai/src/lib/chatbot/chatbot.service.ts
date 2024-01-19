import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { AssistantService } from '../assistant/assistant.service';
import {
  MessageContentText,
  MessageCreateParams,
  Run,
  ThreadMessage,
} from 'openai/resources/beta/threads';
import { RunService } from '../run/run.service';

@Injectable()
export class ChatbotService {
  private readonly provider = this.aiService.provider;
  private readonly threads = this.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly assistantService: AssistantService,
    private readonly runService: RunService,
  ) {}

  async call(threadId: string, content: string): Promise<string> {
    const userMessage: MessageCreateParams = { role: 'user', content };
    await this.threads.messages.create(threadId, userMessage);

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
