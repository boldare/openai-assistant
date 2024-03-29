import { Injectable } from '@nestjs/common';
import { Agent, Agents } from './agent.model';
import { FunctionTool } from 'openai/resources/beta';

@Injectable()
export class AgentService {
  public agents: Agents = {};
  public tools: FunctionTool[] = [];

  add(definition: FunctionTool, fn: Agent): void {
    this.tools.push(definition);
    this.agents[definition.function.name] = fn;
  }

  get(name: string): Agent {
    return this.agents[name];
  }
}
