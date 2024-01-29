import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssistantAiModule } from '@boldare/assistant-ai';
import { chatConfig } from './chat.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [chatConfig] }),
    AssistantAiModule.forRoot(chatConfig()),
  ],
})
export class ChatModule {}
