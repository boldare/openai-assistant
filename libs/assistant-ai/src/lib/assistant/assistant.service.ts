import { Inject, Injectable, Logger } from '@nestjs/common';
import { Assistant, AssistantCreateParams } from 'openai/resources/beta';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantConfig } from './assistant.model';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private readonly assistants = this.aiService.provider.beta.assistants;
  public assistant!: Assistant;

  constructor(
    @Inject('config') private config: AssistantConfig,
    private readonly aiService: AiService,
    private readonly assistantFilesService: AssistantFilesService,
    private readonly assistantMemoryService: AssistantMemoryService,
    private readonly agentService: AgentService,
  ) {}

  getParams(): AssistantCreateParams {
    return {
      ...this.config.params,
      tools: [...(this.config.params.tools || []), ...this.agentService.tools],
    };
  }

  async init(): Promise<void> {
    const { id, options } = this.config;

    if (!id) {
      return await this.create();
    }

    try {
      this.assistant = await this.assistants.update(
        id,
        this.getParams(),
        options,
      );
    } catch (e) {
      await this.create();
    }
  }

  async update(params: Partial<AssistantCreateParams>): Promise<void> {
    this.assistant = await this.assistants.update(this.assistant.id, params);
  }

  async create(): Promise<void> {
    const { options } = this.config;
    const params = this.getParams();
    this.assistant = await this.assistants.create(params, options);

    if (this.config.files?.length) {
      this.assistant = await this.updateFiles();
    }

    this.logger.log(`Created new assistant (${this.assistant.id})`);
    await this.assistantMemoryService.saveAssistantId(this.assistant.id);
  }

  async updateFiles(fileNames?: string[]): Promise<Assistant> {
    const names = fileNames || this.config.files || [];
    const file_ids = await this.assistantFilesService.create(names);

    await this.update({ file_ids });
    return this.assistant;
  }
}
