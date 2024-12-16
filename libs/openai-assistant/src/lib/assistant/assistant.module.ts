import {
  DynamicModule,
  Inject,
  Module,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  AssistantService,
  AssistantFilesService,
  AssistantMemoryService,
  AssistantConfigParams,
} from '../assistant';
import { RunModule } from '../run';
import { AgentModule } from '../agent';
import { AiModule } from '../ai';
import { FilesModule } from '../files';
import { ThreadsModule } from '../threads';
import { ChatModule } from '../chat';
import { ConfigModule, ConfigService } from '../config';

const sharedServices = [
  AssistantService,
  AssistantFilesService,
  AssistantMemoryService,
];

const sharedModules = [AgentModule, RunModule];
export class AssistantModule implements OnModuleInit {
  constructor(
    private readonly assistantService: AssistantService,
    private readonly configService: ConfigService,
    @Inject('config') @Optional() private config: AssistantConfigParams,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.config) {
      return;
    }

    this.configService.set(this.config);
    await this.assistantService.init();
  }

  // TODO: change this for register
  static forFeature(config: AssistantConfigParams): DynamicModule {
    return {
      module: AssistantModule,
      imports: [
        ConfigModule,
        HttpModule,
        ...sharedModules,
        AiModule.register(config?.assistantPrefix || ''),
        ThreadsModule.register(config?.assistantPrefix || ''),
        FilesModule.register(config?.assistantPrefix || ''),
        ChatModule.register(config?.assistantPrefix || ''),
      ],
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
        ...sharedServices,
      ],

      exports: [...sharedServices, ...sharedModules, ChatModule],
    };
  }
}
