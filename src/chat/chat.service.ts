import { Injectable } from '@nestjs/common';
import { Assistant, Thread } from 'openai/resources/beta';
import { AiService } from '../assistant/ai.service';
import { ChatbotService } from '../assistant/chatbot.service';
import { ChatCall, ChatUpdateFiles } from './chat.model';
import { AssistantService } from '../assistant/assistant.service';
import { ChatConfig } from './chat.config';

@Injectable()
export class ChatService {
  // @TODO: this is only as an example
  defaultThread: Thread;

  constructor(
    private readonly aiService: AiService,
    private readonly chatbotService: ChatbotService,
    private readonly assistantService: AssistantService,
    private readonly chatConfig: ChatConfig,
  ) {}

  async init(): Promise<void> {
    this.defaultThread = await this.createThread();
  }

  async createThread(): Promise<Thread> {
    return this.aiService.provider.beta.threads.create();
  }

  async call({ message }: ChatCall): Promise<string> {
    const threadId = this.defaultThread.id;
    return this.chatbotService.call(threadId, message);
  }

  async updateFiles({ files }: ChatUpdateFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(
      files || this.chatConfig.get().files || [],
    );
  }
}
