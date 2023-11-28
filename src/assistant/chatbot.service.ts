import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta';
import { AiService } from './ai.service';

@Injectable()
export class ChatbotService {
  provider: OpenAI = this.aiService.openai;
  assistant: Assistant;

  constructor(private aiService: AiService) {}
}
