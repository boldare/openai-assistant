import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Assistant } from 'openai/resources/beta';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';

@Injectable()
export class AssistantService implements OnModuleInit {
  private readonly logger = new Logger(AssistantService.name);
  private readonly assistants = this.aiService.openai.beta.assistants;
  public assistant: Assistant;

  constructor(
    @Inject('config') private config: AssistantConfig,
    private readonly aiService: AiService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.assistant = await this.init();
  }

  async init(): Promise<Assistant> {
    const assistantId = this.config.id;

    if (!assistantId) {
      return this.create();
    }

    try {
      // @TODO: Retrieve and edit assistant API
      return await this.assistants.retrieve(assistantId);
    } catch (e) {
      return this.create();
    }
  }

  async create(): Promise<Assistant> {
    const assistant = await this.assistants.create(
      this.config.params,
      this.config.options,
    );

    this.logger.log(`Created new assistant (${assistant.id})`);
    // @TODO: Save Assistant ID in the ENV variables

    return assistant;
  }
}
