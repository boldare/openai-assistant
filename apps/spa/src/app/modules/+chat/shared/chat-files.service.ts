import { Injectable } from '@angular/core';
import { FilesService } from '../../../components/controls';
import { ChatClientService } from './chat-client.service';

@Injectable({ providedIn: 'root' })
export class ChatFilesService {

  constructor(
    private readonly chatClientService: ChatClientService,
    private readonly filesService: FilesService,
  ) {}

  async sendFiles(): Promise<string[]> {
    const files = this.filesService.files$.value;

    if (!files.length) {
      return [];
    }

    const uploadedFiles = await this.chatClientService.uploadFiles({ files });
    this.filesService.clear();

    return uploadedFiles?.map(file => file.id) || [];
  }
}
