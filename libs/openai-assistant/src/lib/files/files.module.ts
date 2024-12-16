import { DynamicModule, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AiModule } from '../ai';
import { createControllerWithPrefix } from '../../utils/controllers';

@Module({
  imports: [AiModule],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {
  static register(prefix: string): DynamicModule {
    return {
      module: FilesModule,
      providers: [
        AiModule,
        {
          provide: 'PREFIX',
          useValue: prefix,
        },
      ],
      controllers: [createControllerWithPrefix(FilesController, prefix)],
      exports: [FilesService],
    };
  }
}
