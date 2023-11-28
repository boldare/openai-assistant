import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';
import chatConfig from './chat.config';
import { AssistantModule } from '../assistant/assistant.module';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    ConfigModule.forRoot({ load: [chatConfig] }),
    AssistantModule.forRoot(chatConfig()),
  ],
})
export class ChatModule {}
