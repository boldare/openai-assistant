import { DynamicModule, Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { ChatbotService } from './chatbot.service';
import { ThreadService } from './thread.service';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';

const sharedServices = [
  AiService,
  AssistantService,
  ThreadService,
  ChatbotService,
];

@Module({
  providers: [...sharedServices],
  exports: [...sharedServices],
})
export class AssistantModule {
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
