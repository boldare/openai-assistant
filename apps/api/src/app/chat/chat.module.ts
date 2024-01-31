import { Module } from '@nestjs/common';
import { AssistantAiModule } from '@boldare/assistant-ai';
import { assistantConfig } from './chat.config';

@Module({
  imports: [
    AssistantAiModule.forRoot(assistantConfig),
  ],
})
export class ChatModule {}
