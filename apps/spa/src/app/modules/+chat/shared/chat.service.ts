import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AudioResponse,
  ChatEvents,
} from './chat.model';
import io from 'socket.io-client';
import {
  ChatAudio,
  ChatAudioResponse,
  ChatCall,
  ChatCallResponse,
  SpeechPayload,
  UploadFileResponse, UploadFilesPayload,
} from '@boldare/assistant-ai';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io(environment.websocketUrl);

  constructor(private readonly httpClient: HttpClient) {}

  postMessage(content: string): Observable<ChatCallResponse> {
    return this.httpClient.post<ChatCallResponse>(`${environment.apiUrl}/chat`, {
      content,
    });
  }

  sendMessage(payload: ChatCall): void {
    this.socket.emit(ChatEvents.SendMessage, payload);
  }

  transcription(payload: ChatAudio): Observable<AudioResponse> {
    const formData = new FormData();
    // @ts-ignore
    Object.keys(payload).forEach(key => formData.append(key, payload[key]));

    return this.httpClient.post<AudioResponse>(
      `${environment.apiUrl}/chat/transcription`,
      formData,
    );
  }

  speech(payload: SpeechPayload): Observable<ChatAudioResponse> {
    return this.httpClient.post<ChatAudioResponse>(
      `${environment.apiUrl}/chat/speech`,
      payload,
    );
  }

  getMessages() {
    return new Observable<ChatCall>(observer => {
      this.socket.on(ChatEvents.MessageReceived, data => observer.next(data));
      return () => {
        this.socket.disconnect();
      };
    });
  }

  async uploadFiles(payload: UploadFilesPayload): Promise<UploadFileResponse> {
    const formData = new FormData();

    payload.files.forEach((file) => formData.append('files', file));

    return await lastValueFrom(this.httpClient.post<UploadFileResponse>(
      `${environment.apiUrl}/chat/files`,
      formData,
    ));
  }
}
