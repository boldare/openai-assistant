import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssistantModule } from './assistant/assistant.module';
import assistantModuleOptions from './config/assistant.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [assistantModuleOptions] }),
    AssistantModule.forRoot(assistantModuleOptions()),
  ],
})
export class AppModule {}
