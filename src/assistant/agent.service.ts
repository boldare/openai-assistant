import { Injectable } from '@nestjs/common';
import { Agent, Agents } from './agent.model';

@Injectable()
export class AgentService {
  public agents: Agents = {};

  add(name: string, fn: Agent): void {
    this.agents[name] = fn;
  }

  get(name: string): Agent {
    return this.agents[name];
  }
}
