import { Injectable } from '@nestjs/common';
import { FileObject } from 'openai/resources';
import { createReadStream } from 'fs';
import { AiService } from '../ai';
import { ConfigService } from '../config';

@Injectable()
export class AssistantFilesService {
  constructor(
    private readonly assistantConfig: ConfigService,
    private readonly aiService: AiService,
  ) {}

  async create(
    fileNames: string[],
    fileDir = this.assistantConfig.get().filesDir,
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
