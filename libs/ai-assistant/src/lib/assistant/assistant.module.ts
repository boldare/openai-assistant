import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
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

const sharedModules = [
  AiModule,
  AgentModule,
  RunModule,
  FilesModule,
  ThreadsModule,
  ChatModule,
];

@Module({
  imports: [ConfigModule, HttpModule, ...sharedModules],
  providers: [...sharedServices],
  exports: [...sharedServices, ...sharedModules],
})
export class AssistantModule implements OnModuleInit {
  constructor(
    private readonly assistantService: AssistantService,
    private readonly configService: ConfigService,
    @Inject('config') private config: AssistantConfigParams,
  ) {}

  async onModuleInit(): Promise<void> {
    this.configService.set(this.config);
    await this.assistantService.init();
  }

  static forRoot(config: AssistantConfigParams): DynamicModule {
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
