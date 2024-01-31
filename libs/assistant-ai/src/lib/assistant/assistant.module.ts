import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AssistantService, AssistantFilesService, AssistantMemoryService, AssistantConfig } from '../assistant';
import { RunModule } from '../run';
import { AgentModule } from '../agent';
import { AiModule } from '../ai';
import { FilesModule } from '../files';
import { ThreadsModule } from '../threads';
import { ChatModule } from '../chat/chat.module';

const sharedServices = [
  AssistantConfig,
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
  imports: [
    HttpModule,
    ...sharedModules
  ],
  providers: [
    ...sharedServices,
  ],
  exports: [
    ...sharedServices,
    ...sharedModules,
  ],
})
export class AssistantModule {}
