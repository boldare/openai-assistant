import { Injectable, Logger } from '@nestjs/common';
import { Assistant, AssistantCreateParams } from 'openai/resources/beta';
import { writeFile, readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import * as envfile from 'envfile';
import { AiService } from './ai.service';
import { AssistantConfig } from './assistant.model';
import { FileObject } from 'openai/resources';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private readonly assistants = this.aiService.provider.beta.assistants;
  public assistant: Assistant;
  public config: AssistantConfig;

  constructor(private readonly aiService: AiService) {}

  async init(config: AssistantConfig): Promise<void> {
    this.config = config;
    const { id, params, options } = config;

    if (!id) {
      this.assistant = await this.create(config);
    }

    try {
      this.assistant = await this.assistants.update(id, params, options);
    } catch (e) {
      this.assistant = await this.create(config);
    }
  }

  async update(params: Partial<AssistantCreateParams>): Promise<Assistant> {
    this.assistant = await this.assistants.update(this.assistant.id, {
      ...params,
    });
    return this.assistant;
  }

  async create({ params, options }: AssistantConfig): Promise<Assistant> {
    const assistant = await this.assistants.create(params, options);

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

  async createFiles(fileNames: string[]): Promise<string[]> {
    const files: FileObject[] = [];

    for (const name of fileNames) {
      const file = await this.aiService.provider.files.create({
        file: createReadStream(`${this.config.filesDir}/${name}`),
        purpose: 'assistants',
      });

      files.push(file);
    }

    return files.map(({ id }) => id);
  }

  async updateFiles(fileNames: string[]): Promise<Assistant> {
    const file_ids = await this.createFiles(fileNames);
    return await this.update({ file_ids });
  }
}
