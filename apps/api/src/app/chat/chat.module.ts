import { Module } from '@nestjs/common';
import { AssistantModule } from '@boldare/ai-assistant';
import { assistantConfig } from './chat.config';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [AssistantModule.forRoot(assistantConfig), AgentsModule],
})
export class ChatModule {}
