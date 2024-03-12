import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatEvents, ChatAudio, ChatCall } from './chat.model';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;
  private readonly logger: Logger;

  constructor(private readonly chatsService: ChatService) {
    this.logger = new Logger(ChatGateway.name);
  }

  async handleConnection() {}

  @SubscribeMessage(ChatEvents.SendMessage)
  async listenForMessages(
    @MessageBody() request: ChatCall,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`Socket "${ChatEvents.SendMessage}" (${socket.id}):
    * thread: ${request.threadId}
    * files: ${request?.file_ids}
    * content: ${request.content}`);

    const message = await this.chatsService.call(request);

    this.server?.to(socket.id).emit(ChatEvents.MessageReceived, message);
    this.logger.log(`Socket "${ChatEvents.MessageReceived}" (${socket.id}):
    * thread: ${message.threadId}
    * content: ${message.content}`);
  }

  @SubscribeMessage(ChatEvents.SendAudio)
  async listenForAudio(
    @MessageBody() request: ChatAudio,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`Socket "${ChatEvents.SendAudio}" (${socket.id}):
    * thread: ${request.threadId}
    * file: ${request.file}`);

    const message = await this.chatsService.transcription(request);

    this.server?.to(socket.id).emit(ChatEvents.MessageReceived, message);
    this.logger.log(`Socket "${ChatEvents.AudioReceived}" (${socket.id}):
    * thread: ${message.threadId}
    * file: ${message.content}`);
  }
}
