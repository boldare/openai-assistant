import { DynamicModule, Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { createControllerWithPrefix } from '../../utils/controllers';

@Module({
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {
  static register(prefix: string): DynamicModule {
    return {
      module: AiModule,
      providers: [
        AiService,
        {
          provide: 'PREFIX',
          useValue: prefix,
        },
      ],
      controllers: [createControllerWithPrefix(AiController, prefix)],
      exports: [AiService],
    };
  }
}
