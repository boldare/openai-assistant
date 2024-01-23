import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AudioPayload,
  AudioResponse,
  ChatEvents,
  MessagePayload,
  MessageResponse,
  SpeechResponse,
} from './chat.model';
import io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io(environment.websocketUrl);

  constructor(private readonly httpClient: HttpClient) {}

  postMessage(content: string): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${environment.apiUrl}/chat`, {
      content,
    });
  }

  sendMessage(payload: MessagePayload): void {
    this.socket.emit(ChatEvents.SendMessage, payload);
  }

  transcription(payload: AudioPayload): Observable<AudioResponse> {
    const formData = new FormData();
    // @ts-ignore
    Object.keys(payload).forEach(key => formData.append(key, payload[key]));

    return this.httpClient.post<AudioResponse>(
      `${environment.apiUrl}/chat/transcription`,
      formData,
    );
  }

  speech(payload: MessageResponse): Observable<SpeechResponse> {
    return this.httpClient.post<SpeechResponse>(
      `${environment.apiUrl}/chat/speech`,
      payload,
    );
  }

  getMessages() {
    return new Observable<MessagePayload>(observer => {
      this.socket.on(ChatEvents.MessageReceived, data => observer.next(data));
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
