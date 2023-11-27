import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { ChatbotService } from './chatbot.service';
import { ThreadService } from './thread.service';

const sharedServices = [AssistantService, ThreadService, ChatbotService];

@Module({
  imports: [],
  providers: [...sharedServices],
  exports: [...sharedServices],
})
export class AssistantModule {}
