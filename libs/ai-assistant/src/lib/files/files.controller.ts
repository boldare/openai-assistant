import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UploadFileResponse } from './files.model';

@Controller('assistant/files')
export class FilesController {
  constructor(public readonly filesService: FilesService) {}

  @Post('/')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async updateFiles(
    @UploadedFiles() uploadedData: { files: Express.Multer.File[] },
  ): Promise<UploadFileResponse> {
    return this.filesService.files(uploadedData.files);
  }
}
