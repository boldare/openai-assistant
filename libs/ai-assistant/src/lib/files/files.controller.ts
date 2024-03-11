import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UploadFilesDto, UploadFilesResponseDto } from './files.model';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('assistant/files')
export class FilesController {
  constructor(public readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: UploadFilesResponseDto })
  @ApiBody({ type: UploadFilesDto })
  @Post('/')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async updateFiles(
    @UploadedFiles() uploadedData: { files: Express.Multer.File[] },
  ): Promise<UploadFilesResponseDto> {
    return {
      files: await this.filesService.files(uploadedData.files),
    };
  }
}
