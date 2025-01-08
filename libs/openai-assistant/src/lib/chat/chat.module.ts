import { DynamicModule } from '@nestjs/common';
import { AiModule } from '../ai';
import { RunModule } from '../run';
import { ChatHelpers } from './chat.helpers';
import { ChatService } from './chat.service';
import { SocketModule } from '@nestjs/websockets/socket-module';
import { ChatController } from './chat.controller';
import { createControllerWithPrefix } from '../../utils/controllers';

export const sharedServices = [ChatHelpers, ChatService];

export class ChatModule {
  static register(prefix: string): DynamicModule {
    return {
      module: ChatModule,
      imports: [SocketModule, AiModule, RunModule],
      providers: [
        ...sharedServices,
        {
          provide: 'PREFIX',
          useValue: prefix,
        },
      ],
      controllers: [createControllerWithPrefix(ChatController, prefix)],
      exports: [...sharedServices],
    };
  }
}
