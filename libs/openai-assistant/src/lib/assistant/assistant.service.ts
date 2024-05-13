import { Injectable, Logger } from '@nestjs/common';
import { Assistant, AssistantCreateParams } from 'openai/resources/beta';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { ConfigService } from '../config';
import { AssistantToolResources } from './assistant.model';
import * as dotenv from 'dotenv';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private readonly assistants = this.aiService.provider.beta.assistants;
  public assistant!: Assistant;

  constructor(
    private readonly aiService: AiService,
    private readonly assistantFilesService: AssistantFilesService,
    private readonly assistantMemoryService: AssistantMemoryService,
    private readonly assistantConfig: ConfigService,
    private readonly agentService: AgentService,
  ) {}

  getParams(): AssistantCreateParams {
    return {
      ...this.assistantConfig.get().params,
      tools: [
        ...(this.assistantConfig.get().params.tools || []),
        ...this.agentService.tools,
      ],
    };
  }
  async init(): Promise<Assistant> {
    const { id, options } = this.assistantConfig.get();
    const config = dotenv.config();
    const assistantId = id || config.parsed?.['ASSISTANT_ID'];

    if (!assistantId) {
      return await this.create();
    }

    try {
      this.assistant = await this.assistants.update(
        assistantId,
        this.getParams(),
        options,
      );
      return this.assistant;
    } catch (e) {
      return await this.create();
    }
  }

  async update(params: Partial<AssistantCreateParams>): Promise<void> {
    this.assistant = await this.assistants.update(this.assistant.id, params);
  }

  async create(): Promise<Assistant> {
    const { options } = this.assistantConfig.get();
    const params = this.getParams();
    this.assistant = await this.assistants.create(params, options);

    if (this.assistantConfig.get().toolResources) {
      this.assistant = await this.updateFiles();
    }

    this.logger.log(`Created new assistant (${this.assistant.id})`);
    await this.assistantMemoryService.saveAssistantId(this.assistant.id);

    return this.assistant;
  }

  async updateFiles(
    toolResources?: AssistantToolResources,
  ): Promise<Assistant> {
    const resources =
      toolResources || this.assistantConfig.get().toolResources || {};
    const updatedResources = await this.assistantFilesService.create(resources);

    await this.update({ tool_resources: updatedResources });

    return this.assistant;
  }
}
