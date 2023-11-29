import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { ChatbotService } from './chatbot.service';
import { AiService } from './ai.service';
import { RunService } from './run.service';
import { AgentService } from './agent.service';

const sharedServices = [
  AiService,
  AssistantService,
  ChatbotService,
  RunService,
  AgentService,
];

@Module({
  providers: [...sharedServices],
  exports: [...sharedServices],
})
export class AssistantModule {}
