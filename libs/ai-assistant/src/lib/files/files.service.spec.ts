import { Test } from '@nestjs/testing';
import { FilesModule } from './files.module';
import { FilesService } from './files.service';
import { FileObject } from 'openai/resources';

describe('FilesService', () => {
  let filesService: FilesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FilesModule],
    }).compile();

    filesService = moduleRef.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('files', () => {
    it('should return an array of FileObject', async () => {
      const files = [{ buffer: Buffer.from('file') }];
      jest
        .spyOn(filesService.provider.files, 'create')
        .mockResolvedValue({ id: '1' } as FileObject);

      const result = await filesService.files(files as Express.Multer.File[]);

      expect(result).toEqual([{ id: '1' }]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
