import { OnModuleInit } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentService } from './agent.service';
import { AgentData } from './agent.model';

export class AgentBase implements OnModuleInit {
  definition!: AssistantCreateParams.AssistantToolsFunction;

  onModuleInit(): void {
    this.agentService.add(this.definition, this.output.bind(this));
  }

  constructor(protected readonly agentService: AgentService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async output(data: AgentData): Promise<string> {
    return '';
  }
}
