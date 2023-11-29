import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssistantConfig } from '../assistant/assistant.model';

@Injectable()
export class ChatConfig {
  constructor(private readonly configService: ConfigService) {}

  get(): AssistantConfig {
    return {
      id: this.configService.get('ASSISTANT_ID') || '',
      filesDir: './src/knowledge',
      files: ['about-us.txt'],
      params: {
        name: 'AI Template',
        instructions: `You are a personal assistant.`,
        tools: [{ type: 'retrieval' }],
        model: 'gpt-4-1106-preview',
        metadata: {},
      },
    };
  }
}
