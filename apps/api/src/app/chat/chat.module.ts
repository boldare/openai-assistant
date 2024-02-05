import { Module } from '@nestjs/common';
import { AssistantModule } from '@boldare/assistant-ai';
import { assistantConfig } from './chat.config';

@Module({
  imports: [
    AssistantModule.forRoot(assistantConfig),
  ],
})
export class ChatModule {}
