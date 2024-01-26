import { Injectable } from '@nestjs/common';
import { Thread } from 'openai/resources/beta';
import { ThreadConfig } from './chat.model';
import { AiService, ChatAudio, ChatbotService, ChatCall, ChatCallResponse } from '@boldare/assistant-ai';

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

  async call(payload: ChatCall): Promise<ChatCallResponse> {
    return {
      threadId: payload.threadId,
      content: await this.chatbotService.call(payload),
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
