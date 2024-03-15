import { Module } from '@nestjs/common';
import { GetAnimalAgent } from './get-animal.agent';
import { AgentModule } from '@boldare/openai-assistant';

@Module({
  imports: [AgentModule],
  providers: [GetAnimalAgent],
})
export class AgentsModule {}
