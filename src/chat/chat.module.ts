import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './chat.controller';
import { AssistantModule } from '../assistant/assistant.module';
import { AssistantService } from '../assistant/assistant.service';
import { ChatService } from './chat.service';
import { ChatConfig } from './chat.config';

@Module({
  imports: [ConfigModule, AssistantModule],
  controllers: [ChatController],
  providers: [ChatConfig, ChatService],
})
export class ChatModule implements OnModuleInit {
  constructor(
    private readonly assistantService: AssistantService,
    private readonly chatConfig: ChatConfig,
    private readonly chatService: ChatService,
  ) {}

  async onModuleInit(): Promise<void> {
    const config = this.chatConfig.get();

    await this.assistantService.init(config);
    await this.chatService.init();
  }
}
