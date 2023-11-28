import { Inject, Injectable, Logger } from '@nestjs/common';
import { Assistant } from 'openai/resources/beta';
import { writeFile, readFile } from 'fs/promises';
import * as envfile from 'envfile';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private readonly assistants = this.aiService.provider.beta.assistants;
  public assistant: Assistant;

  constructor(
    @Inject('config') private config: AssistantConfig,
    private readonly aiService: AiService,
  ) {}

  async init(): Promise<void> {
    const { id, params, options } = this.config;

    if (!id) {
      this.assistant = await this.create();
    }

    try {
      this.assistant = await this.assistants.update(id, params, options);
    } catch (e) {
      this.assistant = await this.create();
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
      this.logger.error(`Can't save variable: ${error}`);
    }
  }
}
