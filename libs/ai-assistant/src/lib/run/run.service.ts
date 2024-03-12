import { Injectable } from '@nestjs/common';
import { Run, RunSubmitToolOutputsParams } from 'openai/resources/beta/threads';
import { AiService } from '../ai';
import { AgentService } from '../agent';

@Injectable()
export class RunService {
  private readonly threads = this.aiService.provider.beta.threads;
  timeout = 2000;
  isRunning = true;

  constructor(
    private readonly aiService: AiService,
    private readonly agentsService: AgentService,
  ) {}

  async continueRun(run: Run): Promise<Run> {
    await new Promise(resolve => setTimeout(resolve, this.timeout));
    return this.threads.runs.retrieve(run.thread_id, run.id);
  }

  async resolve(run: Run, runningStatus = true): Promise<void> {
    while (this.isRunning)
      switch (run.status) {
        case 'cancelling':
        case 'cancelled':
        case 'failed':
        case 'expired':
        case 'completed':
          return;
        case 'requires_action':
          await this.submitAction(run);
          run = await this.continueRun(run);
          this.isRunning = runningStatus;
          continue;
        default:
          run = await this.continueRun(run);
          this.isRunning = runningStatus;
      }
  }

  async submitAction(run: Run): Promise<void> {
    if (run.required_action?.type !== 'submit_tool_outputs') {
      return;
    }

    const toolCalls = run.required_action.submit_tool_outputs.tool_calls || [];
    const outputs: RunSubmitToolOutputsParams.ToolOutput[] = await Promise.all(
      toolCalls.map(async toolCall => {
        const { name, arguments: params } = toolCall.function;
        const agent = this.agentsService.get(name);
        const output = await agent({ params, threadId: run.thread_id });

        return { tool_call_id: toolCall.id, output };
      }),
    );

    await this.threads.runs.submitToolOutputs(run.thread_id, run.id, {
      tool_outputs: outputs,
    });
  }
}
