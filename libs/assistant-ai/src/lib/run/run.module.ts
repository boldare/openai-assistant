import { Module } from '@nestjs/common';
import { AiModule } from '../ai';
import { AgentModule } from '../agent';
import { RunService } from './run.service';

@Module({
  imports: [AiModule, AgentModule],
  providers: [RunService],
  exports: [RunService],
})
export class RunModule {}
