import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';
import { AssistantModule } from '../assistant/assistant.module';
import { ChatService } from './chat.service';
import { chatConfig } from './chat.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [chatConfig] }),
    AssistantModule.forRoot(chatConfig()),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
