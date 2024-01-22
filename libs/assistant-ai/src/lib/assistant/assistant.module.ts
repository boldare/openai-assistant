import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { ChatbotService } from '../chatbot/chatbot.service';
import { AiService } from '../ai/ai.service';
import { RunService } from '../run/run.service';
import { AssistantConfig } from './assistant.model';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { AgentModule } from '../agent/agent.module';
import { HttpModule } from '@nestjs/axios';

const sharedServices = [
  AiService,
  AssistantService,
  AssistantFilesService,
  AssistantMemoryService,
  ChatbotService,
  RunService,
];

@Module({
  imports: [HttpModule, AgentModule],
  providers: [...sharedServices],
  exports: [...sharedServices],
})
export class AssistantModule implements OnModuleInit {
  constructor(private readonly assistantService: AssistantService) {}

  async onModuleInit(): Promise<void> {
    await this.assistantService.init();
  }

  static forRoot(config: AssistantConfig): DynamicModule {
    return {
      module: AssistantModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
      ],
    };
  }
}
