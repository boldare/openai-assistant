import { Module } from '@nestjs/common';
import { AssistantModule } from '@boldare/ai-assistant';
import { assistantConfig } from './chat.config';

@Module({
  imports: [AssistantModule.forRoot(assistantConfig)],
})
export class ChatModule {}
