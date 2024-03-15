import { Test } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesModule } from './files.module';
import { FileObject } from 'openai/resources';
describe('FilesController', () => {
  let filesController: FilesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FilesModule],
      controllers: [FilesController],
    }).compile();

    filesController = moduleRef.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(filesController).toBeDefined();
  });

  describe('updateFiles', () => {
    it('should call filesService.files', async () => {
      const spyOnFiles = jest
        .spyOn(filesController.filesService, 'files')
        .mockResolvedValue([{ id: '1' }] as FileObject[]);

      await filesController.updateFiles({ files: [] });

      expect(spyOnFiles).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
