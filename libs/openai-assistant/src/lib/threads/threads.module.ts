import { DynamicModule, Module } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { AiModule } from '../ai';
import { createControllerWithPrefix } from '../../utils/controllers';

@Module({
  imports: [AiModule],
  providers: [ThreadsService],
  controllers: [ThreadsController],
  exports: [ThreadsService],
})
export class ThreadsModule {
  static register(prefix: string): DynamicModule {
    return {
      module: ThreadsModule,
      providers: [
        ThreadsService,
        {
          provide: 'PREFIX',
          useValue: prefix,
        },
      ],
      controllers: [createControllerWithPrefix(ThreadsController, prefix)],
      exports: [ThreadsService],
    };
  }
}
