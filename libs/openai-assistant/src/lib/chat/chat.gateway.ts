import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatEvents, ChatCallDto } from './chat.model';
import { ChatService } from './chat.service';

export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;
  private readonly logger: Logger;

  constructor(protected readonly chatsService: ChatService) {
    this.logger = new Logger(ChatGateway.name);
  }

  async handleConnection() {}

  @SubscribeMessage(ChatEvents.SendMessage)
  async listenForMessages(
    @MessageBody() request: ChatCallDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`Socket "${ChatEvents.SendMessage}" (${socket.id}):
    * assistant: ${request.assistantId}
    * thread: ${request.threadId}
    * files: ${request?.file_ids}
    * content: ${request.content}`);

    const message = await this.chatsService.call(request);

    this.server?.to(socket.id).emit(ChatEvents.MessageReceived, message);
    this.logger.log(`Socket "${ChatEvents.MessageReceived}" (${socket.id}):
    * assistant: ${request.assistantId}
    * thread: ${message.threadId}
    * content: ${message.content}`);
  }
}
