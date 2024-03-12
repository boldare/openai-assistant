import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { mockFileData, transcriptionMock } from './ai.mock';

describe('AiController', () => {
  let aiController: AiController;
  let aiService: AiService;

  beforeEach(() => {
    aiService = new AiService();
    aiController = new AiController(aiService);

    jest
      .spyOn(aiService.provider.audio.transcriptions, 'create')
      .mockResolvedValue(transcriptionMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('transcription', () => {
    it('should return transcription', async () => {
      const transcription = await aiController.postTranscription(mockFileData);

      expect(transcription).toEqual({ content: transcriptionMock.text });
    });

    it('should throw an error', async () => {
      jest
        .spyOn(aiService.provider.audio.transcriptions, 'create')
        .mockRejectedValue(new Error());

      try {
        await aiController.postTranscription(mockFileData);
      } catch (error) {
        expect((error as Error).message).toBeTruthy();
      }
    });
  });

  describe('speech', () => {
    it('should return speech', async () => {
      const speech = await aiController.postSpeech({ content: 'Hello' });

      expect(speech).toBeInstanceOf(Buffer);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(aiService.provider.audio.speech, 'create')
        .mockRejectedValue(new Error());

      try {
        await aiController.postSpeech({ content: 'Hello' });
      } catch (error) {
        expect((error as Error).message).toBeTruthy();
      }
    });
  });
});
