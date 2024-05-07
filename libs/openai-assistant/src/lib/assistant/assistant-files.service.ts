import { Injectable } from '@nestjs/common';
import { FileObject } from 'openai/resources';
import { createReadStream } from 'fs';
import { AiService } from '../ai';
import { ConfigService } from '../config';
import { AssistantCreateParams, VectorStore } from 'openai/resources/beta';
import ToolResources = AssistantCreateParams.ToolResources;
import { AssistantUpdateParams } from 'openai/src/resources/beta/assistants';
import {
  AssistantCodeInterpreter,
  AssistantFileSearch,
  AssistantToolResources,
} from './assistant.model';
@Injectable()
export class AssistantFilesService {
  constructor(
    private readonly assistantConfig: ConfigService,
    private readonly aiService: AiService,
  ) {}

  async getFiles(
    attachments: string[] = [],
    fileDir = this.assistantConfig.get().filesDir,
  ): Promise<FileObject[]> {
    const files: FileObject[] = [];

    await Promise.all(
      attachments.map(async item => {
        const file = await this.aiService.provider.files.create({
          file: createReadStream(`${fileDir || ''}/${item}`),
          purpose: 'assistants',
        });

        files.push(file);
      }),
    );

    return files;
  }

  async getCodeInterpreterResources(
    data: AssistantCodeInterpreter,
    fileDir = this.assistantConfig.get().filesDir,
  ): Promise<ToolResources.CodeInterpreter> {
    const files = await this.getFiles(data?.fileNames, fileDir);

    return { file_ids: files.map(({ id }) => id) };
  }

  async getFileSearchResources(
    data: AssistantFileSearch,
    fileDir = this.assistantConfig.get().filesDir,
  ): Promise<ToolResources.FileSearch> {
    if (!data) {
      return { vector_store_ids: [] };
    }

    const vectorStores: VectorStore[] = [];

    await Promise.all(
      Object.entries(data).map(async ([name, values]) => {
        if (!values.length) {
          return;
        }

        const files = values.map(item =>
          createReadStream(`${fileDir || ''}/${item}`),
        );

        const vectorStore =
          await this.aiService.provider.beta.vectorStores.create({ name });

        await this.aiService.provider.beta.vectorStores.fileBatches.uploadAndPoll(
          vectorStore.id,
          { files },
        );

        vectorStores.push(vectorStore);
        return vectorStore;
      }),
    );

    return { vector_store_ids: vectorStores.map(({ id }) => id) };
  }

  async create(
    toolResources: AssistantToolResources,
    fileDir = this.assistantConfig.get().filesDir,
  ): Promise<AssistantUpdateParams.ToolResources> {
    const code_interpreter = toolResources.codeInterpreter
      ? await this.getCodeInterpreterResources(
          toolResources.codeInterpreter,
          fileDir,
        )
      : undefined;
    const file_search = toolResources.fileSearch
      ? await this.getFileSearchResources(toolResources.fileSearch, fileDir)
      : undefined;

    return {
      ...(code_interpreter ? { code_interpreter } : {}),
      ...(file_search ? { file_search } : {}),
    };
  }
}
