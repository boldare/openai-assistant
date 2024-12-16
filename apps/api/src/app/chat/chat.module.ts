import { Module } from '@nestjs/common';
import { AssistantModule } from '@boldare/openai-assistant';
import { assistantConfig } from './chat.config';
import { AgentsModule } from './agents/agents.module';
import { ChatSockets } from './chat.sockets';

@Module({
  imports: [
    AgentsModule,
    // AssistantModule.forFeature(assistantConfig),
    AssistantModule.forFeature({
      ...assistantConfig,
      assistantPrefix: 'cx',
    }),
    AssistantModule.forFeature({
      ...assistantConfig,
      assistantPrefix: 'claims',
    }),
  ],
  providers: [ChatSockets],
})
export class ChatModule {}
