import { Injectable } from '@nestjs/common';
import { toFile } from 'openai/uploads';
import { FileObject } from 'openai/resources';
import { AiService } from '../ai';
// @ts-expect-error multer is necessary
// eslint-disable-next-line
import { multer } from 'multer';

@Injectable()
export class FilesService {
  provider = this.aiService.provider;

  constructor(private readonly aiService: AiService) {}

  async files(files: Express.Multer.File[]): Promise<FileObject[]> {
    return await Promise.all(
      files.map(async file => {
        return this.provider.files.create({
          file: await toFile(file.buffer, file.originalname),
          purpose: 'assistants',
        });
      }),
    );
  }

  async retriveFile(fileId: string): Promise<FileObject> {
    return await this.provider.files.retrieve(fileId);
  }
}
