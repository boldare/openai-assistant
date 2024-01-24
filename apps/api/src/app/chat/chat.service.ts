import { Injectable } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { ChatAudio, ChatCall, ThreadConfig } from './chat.model';
import { AiService, ChatbotService } from '@boldare/assistant-ai';

@Injectable()
export class ChatService {
  constructor(
    private readonly aiService: AiService,
    private readonly chatbotService: ChatbotService,
  ) {}

  async getThread(id: string): Promise<Thread> {
    return this.aiService.provider.beta.threads.retrieve(id);
  }

  async createThread({ messages }: ThreadConfig = {}): Promise<Thread> {
    return this.aiService.provider.beta.threads.create({ messages });
  }

  async call({ threadId, content }: ChatCall): Promise<ChatCall> {
    return {
      threadId,
      content: await this.chatbotService.call(threadId, content),
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