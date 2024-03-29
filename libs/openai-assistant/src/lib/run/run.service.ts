import { Injectable } from '@nestjs/common';
import { Run, RunSubmitToolOutputsParams } from 'openai/resources/beta/threads';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { ChatCallCallbacks } from '../chat';
import { assistantStreamEventHandler } from '../stream/stream.utils';

@Injectable()
export class RunService {
  private readonly threads = this.aiService.provider.beta.threads;

  constructor(
    private readonly aiService: AiService,
    private readonly agentsService: AgentService,
  ) {}

  async submitAction(run: Run, callbacks?: ChatCallCallbacks): Promise<void> {
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

    const runner = this.threads.runs.submitToolOutputsStream(
      run.thread_id,
      run.id,
      { tool_outputs: outputs },
    );

    assistantStreamEventHandler(runner, callbacks);
  }
}
