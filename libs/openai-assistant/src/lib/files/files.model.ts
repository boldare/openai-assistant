import { FileObject } from 'openai/resources';
import { ApiProperty } from '@nestjs/swagger';

export type OpenAiFile = FileObject;

export interface UploadFilesPayload {
  files: File[];
}

export class UploadFile {
  @ApiProperty({ description: 'Unique identifier of the file' })
  id!: string;

  @ApiProperty()
  bytes!: number;

  @ApiProperty({ description: 'Datetime the file was created.' })
  created_at!: number;

  @ApiProperty({ description: 'Name of the file' })
  filename!: string;

  @ApiProperty()
  object!: 'file';

  @ApiProperty()
  purpose!:
    | 'fine-tune'
    | 'fine-tune-results'
    | 'assistants'
    | 'assistants_output';

  @ApiProperty()
  status!: 'uploaded' | 'processed' | 'error';

  @ApiProperty()
  status_details?: string;
}

export class UploadFilesResponseDto {
  @ApiProperty({
    isArray: true,
    type: UploadFile,
  })
  files!: FileObject[];
}

export class UploadFilesDto {
  @ApiProperty({ type: 'string', isArray: true, format: 'binary' })
  files!: File[];
}
