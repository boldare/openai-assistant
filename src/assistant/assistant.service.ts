import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Assistant } from 'openai/resources/beta';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';
import { writeFile, readFile } from 'fs/promises';
import * as envfile from 'envfile';

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
    const { id, params, options } = this.config;

    if (!id) {
      return this.create();
    }

    try {
      return await this.assistants.update(id, params, options);
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
    await this.saveAssistantId(assistant.id);

    return assistant;
  }

  async saveAssistantId(id: string): Promise<void> {
    try {
      const sourcePath = './.env';
      const envVariables = await readFile(sourcePath);
      const parsedVariables = envfile.parse(envVariables.toString());
      const newVariables = {
        ...parsedVariables,
        ASSISTANT_ID: id,
      };

      await writeFile(sourcePath, envfile.stringify(newVariables));
    } catch (error) {
      this.logger.error(`Can't save save variable: ${error}`);
    }
  }
}
