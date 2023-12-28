import { Injectable } from '@nestjs/common';
import { Agent, Agents } from './agent.model';
import { AssistantCreateParams } from 'openai/resources/beta';

@Injectable()
export class AgentService {
  public agents: Agents = {};
  public tools: AssistantCreateParams.AssistantToolsFunction[] = [];

  add(
    definition: AssistantCreateParams.AssistantToolsFunction,
    fn: Agent,
  ): void {
    this.tools.push(definition);
    this.agents[definition.function.name] = fn;
  }

  get(name: string): Agent {
    return this.agents[name];
  }
}
