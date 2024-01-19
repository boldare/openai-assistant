import { Inject, Injectable } from '@nestjs/common';
import { FileObject } from 'openai/resources';
import { createReadStream } from 'fs';
import { AiService } from '../ai/ai.service';
import { AssistantConfig } from './assistant.model';

@Injectable()
export class AssistantFilesService {
  constructor(
    @Inject('config') private config: AssistantConfig,
    private readonly aiService: AiService,
  ) {}

  async create(
    fileNames: string[],
    fileDir = this.config.filesDir,
  ): Promise<string[]> {
    const files: FileObject[] = [];

    for (const name of fileNames) {
      const file = await this.aiService.provider.files.create({
        file: createReadStream(`${fileDir || ''}/${name}`),
        purpose: 'assistants',
      });

      files.push(file);
    }

    return files.map(({ id }) => id);
  }
}
