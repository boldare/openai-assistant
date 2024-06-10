import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatClientService } from '../../../modules/+chat/shared/chat-client.service';
import { OpenAiFile } from '@boldare/openai-assistant';

@Injectable({ providedIn: 'root' })
export class MessageContentService {
  data$ = new BehaviorSubject<File[]>([]);

  constructor(private readonly chatClientService: ChatClientService) {}

  add(files: FileList) {
    const updatedFiles = [
      ...this.data$.value,
      ...Object.keys(files).map(key => files[key as unknown as number]),
    ];
    this.data$.next(updatedFiles);
  }

  delete(index: number): void {
    const updatedFiles = this.data$.value.splice(index, 1);
    this.data$.next(updatedFiles);
  }

  clear(): void {
    this.data$.next([]);
  }

  async sendFiles(): Promise<OpenAiFile[]> {
    const files = this.data$.value;

    if (!files.length) {
      return [];
    }

    const uploadedFilesResponse = await this.chatClientService.uploadFiles({
      files,
    });
    this.clear();

    return uploadedFilesResponse.files || [];
  }
}
