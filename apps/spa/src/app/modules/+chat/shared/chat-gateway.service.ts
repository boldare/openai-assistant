import { Injectable } from '@angular/core';
import { ChatEvents } from './chat.model';
import io from 'socket.io-client';
import { ChatCallDto } from '@boldare/ai-assistant';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatGatewayService {
  private socket = io(environment.websocketUrl);

  sendMessage(payload: ChatCallDto): void {
    this.socket.emit(ChatEvents.SendMessage, payload);
  }

  getMessages(): Observable<ChatCallDto> {
    return new Observable<ChatCallDto>(observer => {
      this.socket.on(ChatEvents.MessageReceived, data => observer.next(data));
      return () => this.socket.disconnect();
    });
  }
}
