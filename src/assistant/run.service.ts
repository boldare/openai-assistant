import { Injectable } from '@nestjs/common';
import { Run, RunSubmitToolOutputsParams } from 'openai/resources/beta/threads';
import { AiService } from './ai.service';
import { AgentService } from './agent.service';

@Injectable()
export class RunService {
  private readonly threads = this.aiService.provider.beta.threads;
  public timeout = 2000;

  constructor(
    private readonly aiService: AiService,
    private readonly agentsService: AgentService,
  ) {}

  async resolve(run: Run): Promise<void> {
    while (true)
      switch (run.status) {
        case 'cancelling':
        case 'cancelled':
        case 'failed':
        case 'expired':
        case 'completed':
          return;
        case 'requires_action':
          await this.submitAction(run);
          continue;
        default:
          await new Promise(resolve => setTimeout(resolve, this.timeout));
          run = await this.threads.runs.retrieve(run.thread_id, run.id);
      }
  }

  async submitAction(run: Run): Promise<void> {
    if (run.required_action?.type !== 'submit_tool_outputs') {
      return;
    }

    const toolCalls = run.required_action.submit_tool_outputs.tool_calls || [];
    const outputs: RunSubmitToolOutputsParams.ToolOutput[] = [];

    for (const toolCall of toolCalls) {
      const { name, arguments: arg } = toolCall.function;
      const agent = this.agentsService.get(name);
      const output = await agent(arg);

      outputs.push({ tool_call_id: toolCall.id, output });
    }

    await this.threads.runs.submitToolOutputs(run.thread_id, run.id, {
      tool_outputs: outputs,
    });
  }
}
