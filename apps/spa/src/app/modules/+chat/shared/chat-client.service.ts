import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AudioResponse } from './chat.model';
import {
  ChatAudio,
  ChatAudioResponse,
  SpeechPayload,
  UploadFileResponse,
  UploadFilesPayload,
} from '@boldare/ai-assistant';

@Injectable({ providedIn: 'root' })
export class ChatClientService {
  apiUrl = `${environment.apiUrl}/assistant`;

  constructor(private readonly httpClient: HttpClient) {}

  transcription(payload: ChatAudio): Observable<AudioResponse> {
    const formData = new FormData();

    formData.append('file', payload.file);
    formData.append('threadId', payload.threadId);

    return this.httpClient.post<AudioResponse>(
      `${this.apiUrl}/ai/transcription`,
      formData,
    );
  }

  speech(payload: SpeechPayload): Observable<ChatAudioResponse> {
    return this.httpClient.post<ChatAudioResponse>(
      `${this.apiUrl}/ai/speech`,
      payload,
    );
  }

  async uploadFiles(payload: UploadFilesPayload): Promise<UploadFileResponse> {
    const formData = new FormData();

    payload.files.forEach(file => formData.append('files', file));

    return await lastValueFrom(
      this.httpClient.post<UploadFileResponse>(
        `${this.apiUrl}/files`,
        formData,
      ),
    );
  }
}
