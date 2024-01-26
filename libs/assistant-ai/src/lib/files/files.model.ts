import { FileObject } from 'openai/resources';

export type OpenAiFile = FileObject;

export type UploadFileResponse = OpenAiFile[];

export interface UploadFilesPayload {
  files: File[];
}
