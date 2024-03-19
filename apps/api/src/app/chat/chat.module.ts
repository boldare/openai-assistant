import { Module } from '@nestjs/common';
import { AssistantModule } from '@boldare/openai-assistant';
import { assistantConfig } from './chat.config';
import { AgentsModule } from './agents/agents.module';
import { ChatSockets } from './chat.sockets';

@Module({
  imports: [AgentsModule, AssistantModule.forRoot(assistantConfig)],
  providers: [ChatSockets],
})
export class ChatModule {}
