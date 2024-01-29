import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { AssistantModule, AssistantService, AssistantConfigParams } from './assistant';

@Module({
  imports: [AssistantModule],
})
export class AssistantAiModule implements OnModuleInit {
  constructor(
    private readonly assistantService: AssistantService,
    @Inject('config') private config: AssistantConfigParams,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.assistantService.init(this.config);
  }

  static forRoot(config: AssistantConfigParams): DynamicModule {
    return {
      module: AssistantAiModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
      ],
    };
  }
}

