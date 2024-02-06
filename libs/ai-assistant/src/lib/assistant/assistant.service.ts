import { Injectable, Logger } from '@nestjs/common';
import { Assistant, AssistantCreateParams } from 'openai/resources/beta';
import { AiService } from '../ai';
import { AgentService } from '../agent';
import { AssistantFilesService } from './assistant-files.service';
import { AssistantMemoryService } from './assistant-memory.service';
import { ConfigService } from '../config';

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

  async init(): Promise<void> {
    const { id, options } = this.assistantConfig.get();

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
    const { options } = this.assistantConfig.get();
    const params = this.getParams();
    this.assistant = await this.assistants.create(params, options);

    if (this.assistantConfig.get().files?.length) {
      this.assistant = await this.updateFiles();
    }

    this.logger.log(`Created new assistant (${this.assistant.id})`);
    await this.assistantMemoryService.saveAssistantId(this.assistant.id);
  }

  async updateFiles(fileNames?: string[]): Promise<Assistant> {
    const names = fileNames || this.assistantConfig.get().files || [];
    const file_ids = await this.assistantFilesService.create(names);

    await this.update({ file_ids });
    return this.assistant;
  }
}
