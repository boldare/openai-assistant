import { Module } from '@nestjs/common';
import { AiModule } from '../ai';
import { RunModule } from '../run';
import { ChatHelpers } from './chat.helpers';
import { ChatService } from './chat.service';
import { SocketModule } from '@nestjs/websockets/socket-module';
import { ChatGateway } from './chat.gateway';

export const sharedServices = [
  ChatHelpers,
  ChatService,
];

@Module({
  imports: [SocketModule, AiModule, RunModule],
  providers: [
    ChatGateway,
    ...sharedServices
  ],
  controllers: [],
  exports: [...sharedServices],
})
export class ChatModule {}
