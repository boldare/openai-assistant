import { Injectable, Logger } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import * as envfile from 'envfile';
import * as process from 'process';

@Injectable()
export class AssistantMemoryService {
  private readonly logger = new Logger(AssistantMemoryService.name);

  async saveAssistantId(id: string): Promise<void> {
    try {
      const sourcePath = './.env';
      const envVariables = await readFile(sourcePath);
      const parsedVariables = envfile.parse(envVariables.toString());
      const newVariables = {
        ...parsedVariables,
        ASSISTANT_ID: id,
      };

      process.env.ASSISTANT_ID = id;

      await writeFile(sourcePath, envfile.stringify(newVariables));
    } catch (error) {
      this.logger.error(`Can't save variable: ${error}`);
    }
  }
}
