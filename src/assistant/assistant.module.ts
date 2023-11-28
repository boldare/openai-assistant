import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { ChatbotService } from './chatbot.service';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';
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
