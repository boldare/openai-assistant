import { Injectable, OnModuleInit } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { AiService } from '../assistant/ai/ai.service';
import { ChatbotService } from '../assistant/chatbot/chatbot.service';
import { ChatCall } from './chat.model';

@Injectable()
export class ChatService implements OnModuleInit {
  // @TODO: this is only as an example
  defaultThread: Thread;

  constructor(
    private readonly aiService: AiService,
    private readonly chatbotService: ChatbotService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.defaultThread = await this.createThread();
  }

  async createThread(): Promise<Thread> {
    return this.aiService.provider.beta.threads.create();
  }

  async call({ content }: ChatCall): Promise<string> {
    const threadId = this.defaultThread.id;
    return this.chatbotService.call(threadId, content);
  }
}
