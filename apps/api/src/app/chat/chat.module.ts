import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { chatConfig } from './chat.config';
import { AgentsModule } from './agents/agents.module';
import { ChatGateway } from './chat.gateway';
import { AssistantModule } from '@boldare/assistant-ai';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [chatConfig] }),
    AssistantModule.forRoot(chatConfig()),
    AgentsModule,
    MulterModule.register({}),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
