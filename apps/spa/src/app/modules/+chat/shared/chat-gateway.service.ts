import { Injectable } from '@angular/core';
import { ChatEvents } from './chat.model';
import io from 'socket.io-client';
import {
  ChatCallDto,
  TextCreatedPayload,
  TextDeltaPayload,
  TextDonePayload,
} from '@boldare/openai-assistant';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatGatewayService {
  private socket = io(environment.websocketUrl);

  watchEvent<T>(event: ChatEvents): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(event, data => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  callStart(payload: ChatCallDto): void {
    this.socket.emit(ChatEvents.CallStart, payload);
  }

  callDone(): Observable<ChatCallDto> {
    return this.watchEvent(ChatEvents.CallDone);
  }

  textCreated(): Observable<TextCreatedPayload> {
    return this.watchEvent(ChatEvents.TextCreated);
  }

  textDelta(): Observable<TextDeltaPayload> {
    return this.watchEvent(ChatEvents.TextDelta);
  }

  textDone(): Observable<TextDonePayload> {
    return this.watchEvent(ChatEvents.TextDone);
  }
}
