import { Injectable } from '@angular/core';
import { ChatEvents } from './chat.model';
import io from 'socket.io-client';
import { ChatCall } from '@boldare/assistant-ai';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatGatewayService {
  private socket = io(environment.websocketUrl);

  sendMessage(payload: ChatCall): void {
    this.socket.emit(ChatEvents.SendMessage, payload);
  }

  getMessages(): Observable<ChatCall> {
    return new Observable<ChatCall>(observer => {
      this.socket.on(ChatEvents.MessageReceived, data => observer.next(data));
      return () => this.socket.disconnect();
    });
  }
}
