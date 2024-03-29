import { OnModuleInit } from '@nestjs/common';
import { FunctionTool } from 'openai/resources/beta';
import { AgentService } from './agent.service';
import { AgentData } from './agent.model';

export class AgentBase implements OnModuleInit {
  definition!: FunctionTool;

  onModuleInit(): void {
    this.agentService.add(this.definition, this.output.bind(this));
  }

  constructor(protected readonly agentService: AgentService) {}

  async output(data: AgentData): Promise<string> {
    return data.params || '';
  }
}
