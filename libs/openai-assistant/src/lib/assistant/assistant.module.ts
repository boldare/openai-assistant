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

const sharedModulesWithoutControllers = [AgentModule, RunModule];
const sharedModulesWithControllers = [
  AiModule,
  ThreadsModule,
  FilesModule,
  ChatModule,
];

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

  static register(config: AssistantConfigParams): DynamicModule {
    return {
      module: AssistantModule,
      imports: [
        ConfigModule,
        HttpModule,
        ...sharedModulesWithoutControllers,
        ...sharedModulesWithControllers.map(module =>
          module.register(config?.assistantPrefix || ''),
        ),
      ],
      providers: [
        {
          provide: 'config',
          useValue: config,
        },
        ...sharedServices,
      ],

      exports: [
        ...sharedServices,
        ...sharedModulesWithoutControllers,
        ...sharedModulesWithControllers,
      ],
    };
  }
}
