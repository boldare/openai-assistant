import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ChatEvents, MessagePayload, MessageResponse } from './chat.model';
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

  getMessages() {
    return new Observable<MessagePayload>((observer) => {
      this.socket.on(ChatEvents.MessageReceived, (data) => observer.next(data));
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
