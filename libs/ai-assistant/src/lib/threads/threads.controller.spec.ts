import { Test } from '@nestjs/testing';
import { ThreadsController } from './threads.controller';
import { Thread } from 'openai/resources/beta';
import { ThreadsModule } from './threads.module';
import { ThreadsService } from './threads.service';
import { GetThreadResponseDto } from './threads.model';

describe('ThreadsController', () => {
  let threadsController: ThreadsController;
  let threadsService: ThreadsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ThreadsModule],
      controllers: [ThreadsController],
    }).compile();

    threadsController = moduleRef.get<ThreadsController>(ThreadsController);
    threadsService = moduleRef.get<ThreadsService>(ThreadsService);
  });

  it('should be defined', () => {
    expect(threadsController).toBeDefined();
  });

  describe('getThread', () => {
    it('should call threadsService.getThread', async () => {
      const spyOnGetThread = jest
        .spyOn(threadsService, 'getThread')
        .mockResolvedValue({} as GetThreadResponseDto);

      await threadsController.getThread({ id: '1' });

      expect(spyOnGetThread).toHaveBeenCalled();
    });
  });

  describe('createThread', () => {
    it('should call threadsService.createThread', async () => {
      const spyOnCreateThread = jest
        .spyOn(threadsService, 'createThread')
        .mockResolvedValue({} as Thread);

      await threadsController.createThread({});

      expect(spyOnCreateThread).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
